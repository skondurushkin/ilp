package ru.itone.ilp.services.email;

import jakarta.mail.Authenticator;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Slf4j
@RequiredArgsConstructor
@Service
public class EmailService {

    public void sendSimpleMessage(String to, String subject, String text) {
        try {
            sendEmail();
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    private static final String IMAP_AUTH_EMAIL = "easytender@yandex.ru";
    private static final String IMAP_AUTH_PWD = "ingOneiT";
    private static final String SMTP_SERVER = "smtp.yandex.ru";
    private static final String IMAP_PORT = "993";
    private static final String SMTP_PORT = "465";

    private void sendEmail() throws MessagingException {
        MimeMessage msg = new MimeMessage(connectToMail());
        msg.setFrom(new InternetAddress("easytender@yandex.ru"));
        InternetAddress[] address = {new InternetAddress("easytender@yandex.ru")};
        msg.setRecipients(Message.RecipientType.TO, address);
        msg.setSubject("Jakarta Mail APIs Test");
        msg.addHeader("x-cloudmta-class", "standard");
        msg.addHeader("x-cloudmta-tags", "demo, example");
        msg.setText("Test Message Content");

        Transport.send(msg);

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
        properties.put("mail.store.protocol", "imaps");
        properties.put("mail.imap.ssl.enable", "true");
        properties.put("mail.imap.port", IMAP_PORT);
        properties.put("mail.mime.charset", "UTF-8");
        properties.put("mail.smtp.timeout", "3000");
        properties.put("mail.smtp.connectiontimeout", "3000");
        properties.put("mail.imaps.partialfetch", "false");
        properties.put("mail.imaps.fetchsize", "1048576");
        properties.put("mail.imaps.timeout", "30000");
        properties.put("mail.imaps.connectiontimeout", "30000");
        properties.put("mail.imaps.writetimeout", "30000");
        properties.put("mail.smtp.host", SMTP_SERVER);
        properties.put("mail.smtp.port", SMTP_PORT);
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.ssl.enable", "true");
        Session result = Session.getDefaultInstance(properties, new EmailAuthenticator(IMAP_AUTH_EMAIL, IMAP_AUTH_PWD));
        result.setDebug(false);
        return result;
    }
}
