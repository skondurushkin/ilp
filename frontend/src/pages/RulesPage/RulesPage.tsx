import { Layout } from '../../components/Layout';
import { ReactElement } from 'react';

export function RulesPage(): ReactElement {
    return (
        <Layout>
            <div className="text">
                <h1 className="text-h1">Правила Программы</h1>
                <p className="mt-4 md:mt-5">
                    Программа лояльности компании IT-ONE создана для повышения мотивации и удовлетворенности
                    сотрудников.
                </p>
                <h2 className="text-h2 mt-4 md:mt-6">
                    Наша цель - создать окружение, где каждый сотрудник может реализовать свой потенциал и чувствовать
                    себя комфортно.
                </h2>
                <h3 className="mt-4 font-bold md:mt-6">Преимущества программы лояльности:</h3>
                <ul className="mt-2 space-y-2 md:mt-4">
                    <li>
                        Каждый сотрудник получает персональный доступ к электронной платформе, где можно отслеживать
                        свои достижения и награды.
                    </li>
                    <li>
                        Мы стимулируем сотрудников финансово, начисляя бонусы за выполнение превышения показателей в
                        работе.
                    </li>
                    <li>
                        Мы также организуем различные корпоративные мероприятия, такие как праздники, выездные семинары,
                        спортивные соревнования для того, чтобы усилить межличностные связи сотрудников и создать
                        дополнительные возможности для взаимодействия.
                    </li>
                    <li>
                        Важным элементом нашей программы является обучение и развитие персонала. Мы организуем тренинги,
                        мастер-классы и другие образовательные мероприятия, для того, чтобы сотрудники могли расширять
                        свои знания и навыки.
                    </li>
                    <li>
                        Для нас также важна забота о здоровье наших сотрудников. Мы предлагаем бесплатную спортивную
                        медицинскую страховку, еженедельные фитнес-занятия в спортзале и регулярные медицинские
                        обследования.
                    </li>
                </ul>
                <h3 className="mt-4 font-bold md:mt-6">Правила Программы лояльности:</h3>
                <h4 className="mt-4 dark:text-gray">1. Общие положения</h4>
                <p>
                    1.1. Программа лояльности (далее – Программа) осуществляется для стимулирования и мотивации
                    сотрудников нашей компании.
                </p>
                <p>1.2. Программа является добровольной и не является обязательной для участия.</p>
                <p>
                    1.3. Для участия в Программе необходимо ознакомиться и согласиться с правилами, а также
                    зарегистрироваться на специальном портале.
                </p>
                <p>1.4. Программа действует на территории Российской Федерации до 31 декабря текущего года.</p>
                <h4 className="mt-4 dark:text-gray">2. Условия участия</h4>
                <p>2.1. Участие в Программе могут принимать все сотрудники компании.</p>
                <p>
                    2.2. Для получения бонусов необходимо выполнение следующих условий:
                    <ul>
                        <li>
                            – выполнение задачи или проекта сверх стандарта, что приводит к улучшениюбизнес-показателей
                            компании;
                        </li>
                        <li>– добросовестное и эффективное выполнение своих обязанностей;</li>
                        <li>
                            – совершение инициативных действий, приводящих к повышению эффективности работы компании.
                        </li>
                    </ul>
                </p>
                <h4 className="mt-4 dark:text-gray">3. Принципы начисления бонусов</h4>
                <p>
                    3.1. За выполнение поставленной задачи или проекта сотруднику начисляется кредит в размере,
                    определенном руководством компании в зависимости от сложности и объема проекта.
                </p>
                <p>
                    3.2. За добросовестное и эффективное выполнение своих обязанностей сотрудник получает годовое
                    вознаграждение, размер которого определяется руководством компании.
                </p>
                <p>
                    3.3. За совершение инициативных действий, приводящих к повышению эффективности работы компании,
                    может быть начислен дополнительный бонус.
                </p>
                <h4 className="mt-4 dark:text-gray">4. Вывод бонусов</h4>
                <p>
                    4.1. Бонусы могут быть выведены на карты, указанные сотрудники в своем личном кабинете на портале.
                </p>
                <p>4.2. Вывод бонусов производится ежемесячно.</p>
                <p>4.3. Обмена бонусов на денежные средства не предусмотрено.</p>

                <h4 className="mt-4 dark:text-gray">5. Ответственность</h4>
                <p>
                    5.1. Сотрудник несет ответственность за достоверность предоставленной информации о себе при
                    регистрации на портале.
                </p>
                <p>
                    5.2. Руководство компании имеет право отменить начисление или отозвать бонусы в случае установления
                    факта нарушения сотрудником правил Программы.
                </p>
                <p>5.3. Все вопросы, связанные с Программой лояльности, решаются руководством компании.</p>
            </div>
        </Layout>
    );
}
