import { ElNotification } from 'element-plus'
import i18n from '@/lang'
const { t } = i18n.global

export default {
  addSuccess: (message) => {
    ElNotification.success({
      title: t("add"),
      message: message ? message : t("createSuccess"),
      showClose: false,
    })
  },
  editSuccess: (message) => {
    ElNotification.success({
      title: t("edit"),
      message: message ? message : t("editSuccess"),
      showClose: false,
    })
  },
  deleteSuccess: (message) => {
    ElNotification.success({
      title: t("delete"),
      message: message ? message : t("deleteSuccess"),
      showClose: false,
    })
  }
}