package ru.itone.ilp.persistence.api;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import ru.itone.ilp.persistence.repositories.AccrualRepository;
import ru.itone.ilp.persistence.repositories.ActivityRepository;
import ru.itone.ilp.persistence.repositories.ArticleRepository;
import ru.itone.ilp.persistence.repositories.OperationRepository;
import ru.itone.ilp.persistence.repositories.UserRepository;
import ru.itone.ilp.persistence.repositories.WriteOffRepository;

@RequiredArgsConstructor
@Getter
public class DbJpa {

    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;
    private final ArticleRepository articleRepository;
    private final OperationRepository operationRepository;
    private final AccrualRepository accrualRepository;
    private final WriteOffRepository writeOffRepository;
}
