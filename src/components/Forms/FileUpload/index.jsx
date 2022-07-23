import * as React from 'react';
import styles from './styles.module.css'

const FileUpload = ({ onChange, title, }) => {
    return <div className="test__InputContainer lg">
        <div className={styles.uploadWrapper}>
            <button className={`btn ${styles.uploadBtn}`}>{title}</button>
            <input
                type="file"
                onChange={onChange}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
        </div>

    </div>;
};

export default FileUpload;
