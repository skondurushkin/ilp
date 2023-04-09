package ru.itone.ilp.persistence.types;

import java.io.Serial;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.type.EnumType;

public class AccrualStatusEnumType extends EnumType<AccrualStatus> {
    @Serial
    private static final long serialVersionUID = -5790322017377607752L;

    @Override
    public void nullSafeSet(PreparedStatement st, AccrualStatus value, int index,
            SharedSessionContractImplementor session)
            throws HibernateException, SQLException {
        if(value == null) {
            st.setNull( index, Types.OTHER );
        } else {
            st.setObject( index, value.toString().toLowerCase(), Types.OTHER );
        }
    }

}
