package ru.itone.ilp.persistence.types;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.type.EnumType;

public class OrderStatusEnumType extends EnumType<OrderStatus> {

    private static final long serialVersionUID = -670375636161963997L;

    @Override
    public void nullSafeSet(PreparedStatement st, OrderStatus value, int index,
            SharedSessionContractImplementor session)
            throws HibernateException, SQLException {
        if(value == null) {
            st.setNull( index, Types.OTHER );
        } else {
            st.setObject( index, value.toString().toLowerCase(), Types.OTHER );
        }
    }

}
