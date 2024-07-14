export interface IBookmark {
  id: string
  title: string
  parent_id: string
  url?: string
  userdata?: string
  picture?: any
  children?: any[]
}
