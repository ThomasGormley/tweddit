import { UserResult } from '../UserResult'

export type User = Omit<UserResult['data'], 'subreddit'>
