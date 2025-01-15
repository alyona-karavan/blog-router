import { FC } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

import styles from './Loading.module.scss'

const Loading: FC = () => (
  <Spin className={styles.loading} indicator={<LoadingOutlined style={{ fontSize: 58 }} spin />} />
)

export default Loading
