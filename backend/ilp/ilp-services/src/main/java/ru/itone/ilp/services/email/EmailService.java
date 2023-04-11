package ru.itone.ilp.services.email;

import jakarta.mail.Authenticator;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.itone.ilp.openapi.model.SettingResponse;
import ru.itone.ilp.services.settings.SettingsService;

import java.time.LocalDate;
import java.util.Optional;
import java.util.Properties;

@Slf4j
@Service
public class EmailService {

    private static final String IMAP_AUTH_EMAIL = "easytender@yandex.ru";
    private static final String IMAP_AUTH_PWD = "ingOneiT";
    private static final String SMTP_SERVER = "smtp.yandex.ru";
    private static final String SMTP_PORT = "465";

    private final SettingsService service;

    public EmailService(SettingsService service) {
        this.service = service;
    }

    public void send(String userName, String article, String articleName, LocalDate date) {
        MimeMessage msg = new MimeMessage(connectToMail());
        Optional<SettingResponse> setting = service.getSetting("admin.email");
        String to = setting.isPresent() ? setting.get().getValue() : "easytender@yandex.ru";
        try {
            msg.setFrom(new InternetAddress("easytender@yandex.ru"));
            InternetAddress[] address = {new InternetAddress(to)};
            msg.setRecipients(Message.RecipientType.TO, address);
            msg.setSubject("Новый заказ от пользователя " + userName);
            msg.setText("Пользователь " + userName + " сделал заказ. \n" +
                "Артикул: " + article + " наименование: " + articleName + "\n" +
                "Дата создания заказа: " + date.toString());

            Transport.send(msg);
        } catch (MessagingException e) {
            log.error("Не удалось отправить уведомление администратору ", e);
        }

        log.info("Message Sent.");
    }

    /**
     * Класс нужен для безопасной авторизации.
     */
    private static class EmailAuthenticator extends Authenticator {

        private final String login;
        private final String password;

        EmailAuthenticator(final String login, final String password) {
            this.login = login;
            this.password = password;
        }

        @Override
        public PasswordAuthentication getPasswordAuthentication() {
            return new PasswordAuthentication(login, password);
        }

    }

    private Session connectToMail() {
        Properties properties = new Properties();
        properties.put("mail.debug", "false");
        properties.put("mail.mime.charset", "UTF-8");
        properties.put("mail.smtp.timeout", "3000");
        properties.put("mail.smtp.connectiontimeout", "3000");
        properties.put("mail.smtp.host", SMTP_SERVER);
        properties.put("mail.smtp.port", SMTP_PORT);
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.ssl.enable", "true");
        Session result = Session.getDefaultInstance(properties, new EmailAuthenticator(IMAP_AUTH_EMAIL, IMAP_AUTH_PWD));
        result.setDebug(false);
        return result;
    }
}
