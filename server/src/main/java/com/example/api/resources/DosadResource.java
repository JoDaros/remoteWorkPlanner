package com.example.api.resources;

import com.example.api.qualifiers.NoWrapRootValueObjectMapper;
import com.example.api.responses.RemoteDaysResponse;
import com.example.api.utils.DateUtils;
import com.example.models.RemoteGroup;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Path("/dosad")
@RequestScoped
public class DosadResource {

    @NoWrapRootValueObjectMapper ObjectMapper objectMapper;

    private static RemoteGroup[] groups = {
            new RemoteGroup(LocalDate.parse("2021-09-27"), 1),
            new RemoteGroup(LocalDate.parse("2021-09-28"), 2),
            new RemoteGroup(LocalDate.parse("2021-09-29"), 3),
            new RemoteGroup(LocalDate.parse("2021-09-30"), 4),
            new RemoteGroup(LocalDate.parse("2021-10-01"), 5)
    };

    @GET
    @Path("month")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMonthRemoteDays(@QueryParam("month") String month, @QueryParam("group") int group) throws JsonProcessingException {

        LocalDate dateMonth = LocalDate.parse(month, DateTimeFormatter.ISO_LOCAL_DATE);

        Response responseError = requestValidation(dateMonth,group);
        if(responseError!=null){
            return responseError;
        }

        YearMonth currentYearMonth = YearMonth.of(dateMonth.getYear(), dateMonth.getMonth());

        LocalDate begin = currentYearMonth.atDay(1);
        LocalDate end = currentYearMonth.atEndOfMonth();
        LocalDate aux = begin;

        List<LocalDate> remoteDays = new ArrayList<>();

        LocalDate firstDayRemote;

        RemoteGroup remoteGroup = groups[group - 1];

        while (aux.isBefore(end) && !aux.equals(end)) {
            firstDayRemote = DateUtils.getFirstRemoteDayOnWeek(remoteGroup, aux);
            remoteGroup = new RemoteGroup(firstDayRemote, group);
            remoteDays.add(firstDayRemote);
            remoteDays.add(DateUtils.getNextRemoteDay(firstDayRemote));
            aux = aux.plusWeeks(1);
        }
        remoteDays.sort(LocalDate::compareTo);
        LocalDate[] array = new LocalDate[remoteDays.size()];
        return Response.ok(objectMapper.writeValueAsString(new RemoteDaysResponse(remoteDays.toArray(array))))
                .status(Response.Status.OK).build();
    }

    public Response requestValidation(LocalDate date, int group){
        LocalDate lowerLimitDate = LocalDate.of(2021,10,1);
        LocalDate upperLimit = LocalDate.now().plusYears(2);

        if(date.isBefore(lowerLimitDate)){
            return Response.status(Response.Status.NOT_FOUND).entity(String.format("There are no results before %s",lowerLimitDate)).build();
        }

        if(date.isAfter(upperLimit)){
            return Response.status(Response.Status.NOT_FOUND).entity(String.format("There are no results after %s",lowerLimitDate)).build();
        }

        if(group>5 || group<1){
            return Response.status(Response.Status.NOT_FOUND).entity(String.format("Groups must be between %d and %d",1,5)).build();
        }
        return null;
    }
}