import { UserResult } from '../user-results'

export type User = Omit<UserResult['data'], 'subreddit'>
