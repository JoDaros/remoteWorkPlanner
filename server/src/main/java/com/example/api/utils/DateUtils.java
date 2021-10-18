package com.example.api.utils;

import com.example.models.RemoteGroup;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalField;
import java.time.temporal.WeekFields;
import java.util.Locale;

public class DateUtils {

    private static final TemporalField fieldISO = WeekFields.of(Locale.FRANCE).dayOfWeek();

    public static DayOfWeek getNextWorkDay(DayOfWeek dayOfWeek){

        int val = dayOfWeek.getValue() + 1;

        if(val<2){
            return DayOfWeek.FRIDAY;
        }
        if(val>5){
            return DayOfWeek.MONDAY;
        }

        return DayOfWeek.of(val);

    }

    public static DayOfWeek getPreviousWorkDay(DayOfWeek dayOfWeek){

        int val = dayOfWeek.getValue() - 1;

        if(val<2){
            return DayOfWeek.FRIDAY;
        }

        return DayOfWeek.of(val);

    }

    public static LocalDate getNextRemoteDay(LocalDate date){

        return date.with(fieldISO, getNextWorkDay(date.getDayOfWeek()).getValue());

    }

    public static LocalDate getPreviousValidRemoteDay(LocalDate date){

        if(date.getDayOfWeek()==DayOfWeek.SATURDAY || date.getDayOfWeek()==DayOfWeek.SUNDAY ) {
            return date.with(fieldISO, getPreviousWorkDay(date.getDayOfWeek()).getValue());
        }
        else{
            return date;
        }
    }

    public static LocalDate getFirstRemoteDayOnWeek(RemoteGroup group, LocalDate weekday){
        LocalDate startOfWeek = weekday.with(fieldISO, 1);

        LocalDate firstDayRemote = group.getFirstDayRemote();
        while (firstDayRemote.isBefore(startOfWeek) && !firstDayRemote.equals(startOfWeek)){
            firstDayRemote = getPreviousValidRemoteDay(firstDayRemote.plusDays(6));
        }
        return firstDayRemote;
    }


}
