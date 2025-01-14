import { FC } from 'react'
import { Alert } from 'antd'

import styles from './ErrorComponent.module.scss'

const ErrorComponent: FC = () => {
  return (
      <Alert className={styles.error} message="Error" description="Failed to fetch." type="error" showIcon />
  )
}

export default ErrorComponent