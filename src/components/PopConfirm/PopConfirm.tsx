import { FC } from 'react'
import type { PopconfirmProps } from 'antd'
import { Button, message, Popconfirm } from 'antd'
import { useNavigate } from 'react-router-dom'

import { deleteArticle } from '../../services/api/articles'
import { TPopConfirmProps } from '../../services/types/types'

const PopConfirm: FC<TPopConfirmProps> = ({ slug }) => {
  const navigate = useNavigate()
  const confirm = async () => {
    try {
      await deleteArticle(slug)
      message.success('Article deleted successfully')
      navigate('/')
    } catch (error) {
      message.error('Error deleting article')
    }
  }

  const cancel: PopconfirmProps['onCancel'] = () => {
    message.error('Click on No')
  }

  return (
    <Popconfirm
      title="Delete the article"
      description="Are you sure to delete this article?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <Button danger>Delete</Button>
    </Popconfirm>
  )
}
export default PopConfirm
