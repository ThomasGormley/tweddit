import { UserResult } from '../UserResult.d'

export type User = Omit<UserResult['data'], 'subreddit'>
