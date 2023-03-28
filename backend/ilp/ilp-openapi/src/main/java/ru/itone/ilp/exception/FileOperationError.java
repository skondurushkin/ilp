package ru.itone.ilp.exception;

import lombok.Getter;

public enum FileOperationError {

    CREATE_PATH_ERROR("Ошибка создания папки для файла"),

    EXCEEDED_MAX_FILE_SIZE("Превышен максимальный размер файла"),

    EXCEEDED_MAX_FILES_SIZE("Превышен максимальный размер файлов"),

    INVALID_FILE_NAME_LENGTH("Имя файла должно быть от 3 до 500 символов"),

    EMPTY_FILE_EXTENSION("Не указано расширение файла"),

    WRONG_FILE_EXTENSION("Недопустимое расширение файла"),

    WRITE_ERROR("Ошибка записи файла"),

    READ_ERROR("Ошибка чтения файла"),

    NOT_FOUND_ERROR("Файл не найден"),

    DELETE_ERROR("Ошибка удаления файла"),

    LOCATION_NOT_PERMITTED("Недопустимое расположение файла"),

    MOVE_ERROR("Ошибка перемещения/переименования файла"),

    READ_WRITE_PERMISSION_ERROR("Отсутствуют права на чтение/запись файла"),

    INVALID_PATH("Недопустимое значение пути к файлу"),

    INVALID_FILESIZE_BYTE("Значение размера файла документа не соответствует передаваемому в атрибуте fileSizeByte"),

    INVALID_FILE_NAME("Недопустимое имя файла"),

    INVALID_FILE_TYPE("Недопустимый формат файла");

    @Getter
    private final String message;

    FileOperationError(String message) {
        this.message = message;
    }
}
