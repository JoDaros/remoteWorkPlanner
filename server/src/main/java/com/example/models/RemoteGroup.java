package com.example.models;

import java.time.LocalDate;

public class RemoteGroup {
    private LocalDate firstDayRemote;
    private int number;

    public RemoteGroup(LocalDate firstDayRemote, int number) {
        this.firstDayRemote = firstDayRemote;
        this.number = number;
    }

    public LocalDate getFirstDayRemote() {
        return firstDayRemote;
    }

    public int getNumber() {
        return number;
    }
}
