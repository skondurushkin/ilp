package ru.itone.ilp.persistence.types;

import java.io.Serial;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.type.EnumType;

public class OperationTypeEnumType extends EnumType<OperationType> {

    @Serial
    private static final long serialVersionUID = 6864179068686091248L;

    @Override
    public void nullSafeSet(PreparedStatement st, OperationType value, int index,
            SharedSessionContractImplementor session)
            throws HibernateException, SQLException {
        if(value == null) {
            st.setNull( index, Types.OTHER );
        } else {
            st.setObject( index, value.toString().toLowerCase(), Types.OTHER );
        }
    }
}
