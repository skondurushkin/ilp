package ru.itone.ilp.common;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.function.Predicate;

public enum FileCheck implements Predicate<Path> {
    EXISTS(p -> p.toFile().exists()),
    IS_DIRECTORY(p -> p.toFile().isDirectory()),
    IS_REGULAR(p -> p.toFile().isFile()),
    IS_READABLE(Files::isReadable),
    IS_WRITABLE(Files::isWritable),
    IS_EXECUTABLE(Files::isExecutable),
    IS_SYMLINK(Files::isSymbolicLink),
    ;
    private final Predicate<Path> check;

    FileCheck(Predicate<Path> check) {
        this.check = check;
    }

    public static boolean directoryExists(String directoryPath, FileCheck... moreChecks) {
        return directoryExists(Paths.get(directoryPath), moreChecks);
    }

    public static boolean directoryExists(Path path, FileCheck... moreChecks) {
        if (!(EXISTS.test(path) && IS_DIRECTORY.test(path))) {
            return false;
        }
        for (FileCheck check : moreChecks) {
            if (!check.test(path))
                return false;
        }
        return true;
    }

    @Override
    public boolean test(Path path) {
        return check.test(path);
    }
}
