package ru.itone.ilp.misc;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public class Helpers {
    public static <T> Stream<T> asStream(Iterable<T> it) {
        return StreamSupport.stream(it.spliterator(), false);
    }

    public static <T,R> Stream<R> asStream(Iterable<T> it, Function<T,R> mapper) {
        return StreamSupport.stream(it.spliterator(), false).map(mapper);
    }

    public static <T> List<T> asList(Iterable<T> it) {
        return asList(it, Function.identity());
    }
    public static <T,R> List<R> asList(Iterable<T> it, Function<T,R> mapper) {
        return asStream(it).map(mapper).collect(Collectors.toList());
    }

}
