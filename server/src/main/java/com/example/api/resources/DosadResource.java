package com.example.api.resources;

import com.example.models.RemoteGroup;
import org.jboss.resteasy.reactive.RestQuery;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalField;
import java.time.temporal.WeekFields;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

@Path("/remoteWork")
@ApplicationScoped
public class DosadResource {

    private final TemporalField fieldISO = WeekFields.of(Locale.FRANCE).dayOfWeek();
    private RemoteGroup[] groups;

    public DosadResource(){
        RemoteGroup g1 = new RemoteGroup(LocalDate.parse("2021-09-27"),1);
        RemoteGroup g2 = new RemoteGroup(LocalDate.parse("2021-09-28"),2);
        RemoteGroup g3 = new RemoteGroup(LocalDate.parse("2021-09-29"),3);
        RemoteGroup g4 = new RemoteGroup(LocalDate.parse("2021-09-30"),4);
        RemoteGroup g5 = new RemoteGroup(LocalDate.parse("2021-10-01"),5);
        groups = new RemoteGroup[]{g1, g2, g3, g4, g5};
    }

    @GET
    @Path("week")
    @Produces(MediaType.APPLICATION_JSON)

    public LocalDate[] getWeekdays(@RestQuery String weekOf, @RestQuery int group) {

        LocalDate date = LocalDate.parse(weekOf, DateTimeFormatter.ISO_LOCAL_DATE);
        return getWeekRemoteDays(groups[group-1], date);

    }

    @GET
    @Path("day")
    @Produces(MediaType.APPLICATION_JSON)

    public boolean isRemoteDay(@RestQuery String day, @RestQuery int group) {

        LocalDate dateDay = LocalDate.parse(day, DateTimeFormatter.ISO_LOCAL_DATE);

        return Arrays.asList(getWeekRemoteDays(groups[group-1], dateDay)).contains(dateDay);

    }

    @GET
    @Path("month")
    @Produces(MediaType.APPLICATION_JSON)

    public LocalDate[] getMonthRemoteDays(@RestQuery String month, @RestQuery int group) {

        LocalDate dateMonth = LocalDate.parse(month, DateTimeFormatter.ISO_LOCAL_DATE);

        YearMonth currentYearMonth = YearMonth.of(dateMonth.getYear(),dateMonth.getMonth());

        LocalDate begin = currentYearMonth.atDay(1);
        LocalDate end = currentYearMonth.atEndOfMonth();
        LocalDate aux = begin;

        List<LocalDate> remoteDays = new ArrayList<>();

        LocalDate firstDayRemote;

        RemoteGroup remoteGroup = groups[group-1];

        while (aux.isBefore(end) && !aux.equals(end)){
            firstDayRemote = getFirstRemoteDayOnWeek(remoteGroup, aux);
            remoteGroup = new RemoteGroup(firstDayRemote,group);
            remoteDays.add(firstDayRemote);
            remoteDays.add(getNextRemoteDay(firstDayRemote));
            aux = aux.plusWeeks(1);
        }
        remoteDays.sort( LocalDate::compareTo);
        LocalDate[] array = new LocalDate[remoteDays.size()];
        return remoteDays.toArray(array);
    }


    public LocalDate[] getWeekRemoteDays(RemoteGroup group, LocalDate weekday){
        LocalDate firstDayRemote = getFirstRemoteDayOnWeek(group,weekday);
        return new LocalDate[]{firstDayRemote,getNextRemoteDay(firstDayRemote)};
    }


    public DayOfWeek getNextWorkDay(DayOfWeek dayOfWeek){

        int val = dayOfWeek.getValue() + 1;

        if(val<2){
            return DayOfWeek.FRIDAY;
        }
        if(val>5){
            return DayOfWeek.MONDAY;
        }

        return DayOfWeek.of(val);

    }

    public DayOfWeek getPreviousWorkDay(DayOfWeek dayOfWeek){

        int val = dayOfWeek.getValue() - 1;

        if(val<2){
            return DayOfWeek.FRIDAY;
        }

        return DayOfWeek.of(val);

    }

    public LocalDate getNextRemoteDay(LocalDate date){

        return date.with(fieldISO, getNextWorkDay(date.getDayOfWeek()).getValue());

    }

    public LocalDate getPreviousValidRemoteDay(LocalDate date){

        if(date.getDayOfWeek()==DayOfWeek.SATURDAY || date.getDayOfWeek()==DayOfWeek.SUNDAY ) {
            return date.with(fieldISO, getPreviousWorkDay(date.getDayOfWeek()).getValue());
        }
        else{
            return date;
        }
    }

    public LocalDate getFirstRemoteDayOnWeek(RemoteGroup group, LocalDate weekday){
        LocalDate startOfWeek = weekday.with(fieldISO, 1);

        LocalDate firstDayRemote = group.getFirstDayRemote();
        while (firstDayRemote.isBefore(startOfWeek) && !firstDayRemote.equals(startOfWeek)){
            firstDayRemote = getPreviousValidRemoteDay(firstDayRemote.plusDays(6));
        }
        return firstDayRemote;
    }

}