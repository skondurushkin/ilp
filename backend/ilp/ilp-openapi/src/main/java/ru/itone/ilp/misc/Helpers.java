package ru.itone.ilp.misc;

import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.Synchronized;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public abstract class Helpers {
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
        return asStream(it).map(mapper).toList();
    }


    /**
     * Кэшируем смещение TimeZone (lazy singleton)
     */
    private static volatile ZoneOffset systemZoneOffset = null;

    /**
     * Lazy инициализация systemZoneOffset
     */
    @Synchronized
    private static void initZoneOffset() {
        if (systemZoneOffset == null) {
            systemZoneOffset = OffsetDateTime.now(ZoneId.systemDefault()).getOffset();
        }
    }

    /**
     * @return ZoneOffset системной TimeZone
     */
    public static ZoneOffset getSystemZoneOffset() {
        if (systemZoneOffset == null) {
            initZoneOffset();
        }
        return systemZoneOffset;
    }


}
