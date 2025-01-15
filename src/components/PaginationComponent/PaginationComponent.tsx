import { FC } from 'react'
import { Pagination } from 'antd'

import styles from './PaginationComponent.module.scss'

type PaginationProps = {
  current: number
  total: number
  onChange: (page: number) => void
}

const PaginationComponent: FC<PaginationProps> = ({ current, total, onChange }) => {
  const pageSize = 5
  const totalPages = Math.ceil(total / pageSize)
  return (
    <Pagination
      className={styles.pagination}
      align="center"
      current={current}
      total={totalPages * pageSize}
      onChange={onChange}
      showSizeChanger={false}
      pageSize={pageSize}
      hideOnSinglePage={true}
    />
  )
}

export default PaginationComponent
