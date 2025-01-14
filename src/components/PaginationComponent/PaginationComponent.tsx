import { FC } from 'react';
import { Pagination } from 'antd';

import styles from './PaginationComponent.module.scss';

type PaginationProps  = {
  current: number; // Change from defaultCurrent to current
  total: number;
  onChange: (page: number) => void;
}

const PaginationComponent: FC<PaginationProps> = ({
  current,
  total,
  onChange,
}) => {
  const pageSize = 5; // Set the number of pages to display
  const totalPages = Math.ceil(total / pageSize); // Calculate total pages

  return (
    <Pagination
      className={styles.pagination}
      align="center"
      current={current} // Use current instead of defaultCurrent
      total={totalPages * pageSize} // Set total to the total number of articles
      onChange={onChange}
      showSizeChanger={false}
      pageSize={pageSize}
      hideOnSinglePage={true}
    />
  );
};

export default PaginationComponent;
