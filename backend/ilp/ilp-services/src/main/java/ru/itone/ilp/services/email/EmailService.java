package ru.itone.ilp.services.email;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import ru.itone.ilp.openapi.model.SettingResponse;
import ru.itone.ilp.services.settings.SettingsService;

import java.time.LocalDate;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class EmailService {

    private final SettingsService service;
    private final JavaMailSender emailSender;

    public void send(String userName, String article, String articleName, LocalDate date) {

        Optional<SettingResponse> setting = service.getSetting("admin.email");
        String to = setting.isPresent() ? setting.get().getValue() : "easytender@yandex.ru";

        SimpleMailMessage message = createSimpleMailMessage(userName, article, articleName, date, to);
        emailSender.send(message);

        log.info("Email to: {} sent", to);
    }

    private static SimpleMailMessage createSimpleMailMessage(String userName, String article, String articleName, LocalDate date, String to) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("easytender@yandex.ru");
        message.setTo(to);
        message.setSubject("Новый заказ от пользователя " + userName);
        message.setText("Пользователь " + userName + " сделал заказ. \n" +
            "Артикул: " + article + " наименование: " + articleName + "\n" +
            "Дата создания заказа: " + date.toString());
        return message;
    }
}
