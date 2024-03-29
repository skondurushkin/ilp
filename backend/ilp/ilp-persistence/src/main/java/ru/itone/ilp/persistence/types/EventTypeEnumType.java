package ru.itone.ilp.persistence.types;

import java.io.Serial;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.type.EnumType;

public class EventTypeEnumType extends EnumType<EventType> {

    @Serial
    private static final long serialVersionUID = -3085860216577644214L;

    @Override
    public void nullSafeSet(PreparedStatement st, EventType value, int index,
            SharedSessionContractImplementor session)
            throws HibernateException, SQLException {
        if(value == null) {
            st.setNull( index, Types.OTHER );
        } else {
            st.setObject( index, value.getValue().toLowerCase(), Types.OTHER );
        }
    }
}
