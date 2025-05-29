import {
  useMutation,
  useQuery,
  useInfiniteQuery,
  UseMutationOptions,
  UseQueryOptions,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import {fetcher} from 'src/graphql/fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends {[key: string]: unknown}, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | {[P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: {input: string; output: string};
  String: {input: string; output: string};
  Boolean: {input: boolean; output: boolean};
  Int: {input: number; output: number};
  Float: {input: number; output: number};
  Any: {input: any; output: any};
  Coordinates: {input: any; output: any};
  DateTime: {input: any; output: any};
  Decimal: {input: any; output: any};
  Geometry: {input: any; output: any};
  Long: {input: any; output: any};
  Position: {input: any; output: any};
  TimeSpan: {input: any; output: any};
};

export type AccountDto = {
  __typename?: 'AccountDto';
  businessType?: Maybe<Scalars['String']['output']>;
  chargesEnabled: Scalars['Boolean']['output'];
  country?: Maybe<Scalars['String']['output']>;
  created: Scalars['DateTime']['output'];
  defaultCurrency?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  detailsSubmitted: Scalars['Boolean']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  object?: Maybe<Scalars['String']['output']>;
  payoutsEnabled: Scalars['Boolean']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

export type AddressDto = {
  __typename?: 'AddressDto';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  line1?: Maybe<Scalars['String']['output']>;
  line2?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
};

export type AddressDtoFilterInput = {
  and?: InputMaybe<Array<AddressDtoFilterInput>>;
  city?: InputMaybe<StringOperationFilterInput>;
  country?: InputMaybe<StringOperationFilterInput>;
  line1?: InputMaybe<StringOperationFilterInput>;
  line2?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<AddressDtoFilterInput>>;
  postalCode?: InputMaybe<StringOperationFilterInput>;
  state?: InputMaybe<StringOperationFilterInput>;
};

export type AddressDtoSortInput = {
  city?: InputMaybe<SortEnumType>;
  country?: InputMaybe<SortEnumType>;
  line1?: InputMaybe<SortEnumType>;
  line2?: InputMaybe<SortEnumType>;
  postalCode?: InputMaybe<SortEnumType>;
  state?: InputMaybe<SortEnumType>;
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION',
}

export type BalanceAmountDto = {
  __typename?: 'BalanceAmountDto';
  amount: Scalars['Long']['output'];
  currency?: Maybe<Scalars['String']['output']>;
};

export type BalanceDto = {
  __typename?: 'BalanceDto';
  available?: Maybe<Array<Maybe<BalanceAmountDto>>>;
  connectReserved?: Maybe<Array<Maybe<BalanceAmountDto>>>;
  object?: Maybe<Scalars['String']['output']>;
  pending?: Maybe<Array<Maybe<BalanceAmountDto>>>;
};

export type BalanceTransactionDto = {
  __typename?: 'BalanceTransactionDto';
  amount: Scalars['Long']['output'];
  availableOn: Scalars['DateTime']['output'];
  created: Scalars['DateTime']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  exchangeRate?: Maybe<Scalars['Decimal']['output']>;
  fee: Scalars['Long']['output'];
  id?: Maybe<Scalars['String']['output']>;
  net: Scalars['Long']['output'];
  object?: Maybe<Scalars['String']['output']>;
  reportingCategory?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type BalanceTransactionDtoCollectionSegment = {
  __typename?: 'BalanceTransactionDtoCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<BalanceTransactionDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type BalanceTransactionDtoConnection = {
  __typename?: 'BalanceTransactionDtoConnection';
  /** A list of edges. */
  edges?: Maybe<Array<BalanceTransactionDtoEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<BalanceTransactionDto>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type BalanceTransactionDtoEdge = {
  __typename?: 'BalanceTransactionDtoEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<BalanceTransactionDto>;
};

export type BalanceTransactionDtoFilterInput = {
  amount?: InputMaybe<LongOperationFilterInput>;
  and?: InputMaybe<Array<BalanceTransactionDtoFilterInput>>;
  availableOn?: InputMaybe<DateTimeOperationFilterInput>;
  created?: InputMaybe<DateTimeOperationFilterInput>;
  currency?: InputMaybe<StringOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  exchangeRate?: InputMaybe<DecimalOperationFilterInput>;
  fee?: InputMaybe<LongOperationFilterInput>;
  id?: InputMaybe<StringOperationFilterInput>;
  net?: InputMaybe<LongOperationFilterInput>;
  object?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<BalanceTransactionDtoFilterInput>>;
  reportingCategory?: InputMaybe<StringOperationFilterInput>;
  status?: InputMaybe<StringOperationFilterInput>;
  type?: InputMaybe<StringOperationFilterInput>;
};

export type BalanceTransactionDtoSortInput = {
  amount?: InputMaybe<SortEnumType>;
  availableOn?: InputMaybe<SortEnumType>;
  created?: InputMaybe<SortEnumType>;
  currency?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  exchangeRate?: InputMaybe<SortEnumType>;
  fee?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  net?: InputMaybe<SortEnumType>;
  object?: InputMaybe<SortEnumType>;
  reportingCategory?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  type?: InputMaybe<SortEnumType>;
};

export type BlockUser = {
  __typename?: 'BlockUser';
  blockedUser?: Maybe<User>;
  blockedUserId: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type BlockUserInput = {
  blockedUserId: Scalars['Int']['input'];
};

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Category = {
  __typename?: 'Category';
  children?: Maybe<Array<Category>>;
  createdByGamma: Scalars['Boolean']['output'];
  createdDate: Scalars['DateTime']['output'];
  group?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  parent?: Maybe<Category>;
  parentId?: Maybe<Scalars['Int']['output']>;
  priority: Scalars['Int']['output'];
  tags?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']['output']>;
};

/** A segment of a collection. */
export type CategoryCollectionSegment = {
  __typename?: 'CategoryCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Category>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type CategoryConnection = {
  __typename?: 'CategoryConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CategoryEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<Category>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type CategoryEdge = {
  __typename?: 'CategoryEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Category>;
};

export type CategoryFilterInput = {
  and?: InputMaybe<Array<CategoryFilterInput>>;
  children?: InputMaybe<ListFilterInputTypeOfCategoryFilterInput>;
  createdByGamma?: InputMaybe<BooleanOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  group?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  imageUrl?: InputMaybe<StringOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<CategoryFilterInput>>;
  parent?: InputMaybe<CategoryFilterInput>;
  parentId?: InputMaybe<IntOperationFilterInput>;
  priority?: InputMaybe<IntOperationFilterInput>;
  tags?: InputMaybe<StringOperationFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<IntOperationFilterInput>;
};

export type CategoryInput = {
  group?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CategorySortInput = {
  createdByGamma?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  group?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  imageUrl?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  parent?: InputMaybe<CategorySortInput>;
  parentId?: InputMaybe<SortEnumType>;
  priority?: InputMaybe<SortEnumType>;
  tags?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type ChangePassowrdInput = {
  newPassword?: InputMaybe<Scalars['String']['input']>;
  oldPassword?: InputMaybe<Scalars['String']['input']>;
};

export type ChannelRecord = {
  __typename?: 'ChannelRecord';
  channelName?: Maybe<Scalars['String']['output']>;
  createdDate: Scalars['DateTime']['output'];
  duration: Scalars['TimeSpan']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  live?: Maybe<Live>;
  liveId?: Maybe<Scalars['Int']['output']>;
  resourceId?: Maybe<Scalars['String']['output']>;
  sessionId?: Maybe<Scalars['String']['output']>;
  sid?: Maybe<Scalars['String']['output']>;
};

export type ChannelRecordFilterInput = {
  and?: InputMaybe<Array<ChannelRecordFilterInput>>;
  channelName?: InputMaybe<StringOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  duration?: InputMaybe<TimeSpanOperationFilterInput>;
  endDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  live?: InputMaybe<LiveFilterInput>;
  liveId?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<ChannelRecordFilterInput>>;
  resourceId?: InputMaybe<StringOperationFilterInput>;
  sessionId?: InputMaybe<StringOperationFilterInput>;
  sid?: InputMaybe<StringOperationFilterInput>;
};

export type ChargeDto = {
  __typename?: 'ChargeDto';
  amount: Scalars['Long']['output'];
  amountCaptured: Scalars['Long']['output'];
  amountRefunded: Scalars['Long']['output'];
  applicationFeeAmount?: Maybe<Scalars['Long']['output']>;
  applicationFeeId?: Maybe<Scalars['String']['output']>;
  applicationId?: Maybe<Scalars['String']['output']>;
  balanceTransactionId?: Maybe<Scalars['String']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  customerId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  disputed: Scalars['Boolean']['output'];
  entityId?: Maybe<Scalars['Int']['output']>;
  failureCode?: Maybe<Scalars['String']['output']>;
  failureMessage?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  invoice?: Maybe<Scalars['String']['output']>;
  invoiceId?: Maybe<Scalars['String']['output']>;
  last4CardNumber?: Maybe<Scalars['String']['output']>;
  livemode: Scalars['Boolean']['output'];
  paymentDate: Scalars['DateTime']['output'];
  paymentIntentId?: Maybe<Scalars['String']['output']>;
  paymentMethod?: Maybe<Scalars['String']['output']>;
  receiptEmail?: Maybe<Scalars['String']['output']>;
  receiptNumber?: Maybe<Scalars['String']['output']>;
  receiptUrl?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type ChargeDtoCollectionSegment = {
  __typename?: 'ChargeDtoCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<ChargeDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type ChargeDtoConnection = {
  __typename?: 'ChargeDtoConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ChargeDtoEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<ChargeDto>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ChargeDtoEdge = {
  __typename?: 'ChargeDtoEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<ChargeDto>;
};

export type ChargeDtoFilterInput = {
  amount?: InputMaybe<LongOperationFilterInput>;
  amountCaptured?: InputMaybe<LongOperationFilterInput>;
  amountRefunded?: InputMaybe<LongOperationFilterInput>;
  and?: InputMaybe<Array<ChargeDtoFilterInput>>;
  applicationFeeAmount?: InputMaybe<LongOperationFilterInput>;
  applicationFeeId?: InputMaybe<StringOperationFilterInput>;
  applicationId?: InputMaybe<StringOperationFilterInput>;
  balanceTransactionId?: InputMaybe<StringOperationFilterInput>;
  currency?: InputMaybe<StringOperationFilterInput>;
  customerId?: InputMaybe<StringOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  disputed?: InputMaybe<BooleanOperationFilterInput>;
  entityId?: InputMaybe<IntOperationFilterInput>;
  failureCode?: InputMaybe<StringOperationFilterInput>;
  failureMessage?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<StringOperationFilterInput>;
  invoice?: InputMaybe<StringOperationFilterInput>;
  invoiceId?: InputMaybe<StringOperationFilterInput>;
  last4CardNumber?: InputMaybe<StringOperationFilterInput>;
  livemode?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<ChargeDtoFilterInput>>;
  paymentDate?: InputMaybe<DateTimeOperationFilterInput>;
  paymentIntentId?: InputMaybe<StringOperationFilterInput>;
  paymentMethod?: InputMaybe<StringOperationFilterInput>;
  receiptEmail?: InputMaybe<StringOperationFilterInput>;
  receiptNumber?: InputMaybe<StringOperationFilterInput>;
  receiptUrl?: InputMaybe<StringOperationFilterInput>;
};

export type ChargeDtoSortInput = {
  amount?: InputMaybe<SortEnumType>;
  amountCaptured?: InputMaybe<SortEnumType>;
  amountRefunded?: InputMaybe<SortEnumType>;
  applicationFeeAmount?: InputMaybe<SortEnumType>;
  applicationFeeId?: InputMaybe<SortEnumType>;
  applicationId?: InputMaybe<SortEnumType>;
  balanceTransactionId?: InputMaybe<SortEnumType>;
  currency?: InputMaybe<SortEnumType>;
  customerId?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  disputed?: InputMaybe<SortEnumType>;
  entityId?: InputMaybe<SortEnumType>;
  failureCode?: InputMaybe<SortEnumType>;
  failureMessage?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  invoice?: InputMaybe<SortEnumType>;
  invoiceId?: InputMaybe<SortEnumType>;
  last4CardNumber?: InputMaybe<SortEnumType>;
  livemode?: InputMaybe<SortEnumType>;
  paymentDate?: InputMaybe<SortEnumType>;
  paymentIntentId?: InputMaybe<SortEnumType>;
  paymentMethod?: InputMaybe<SortEnumType>;
  receiptEmail?: InputMaybe<SortEnumType>;
  receiptNumber?: InputMaybe<SortEnumType>;
  receiptUrl?: InputMaybe<SortEnumType>;
};

/** Information about the offset pagination. */
export type CollectionSegmentInfo = {
  __typename?: 'CollectionSegmentInfo';
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
};

export type Community = {
  __typename?: 'Community';
  communityType: CommunityType;
  createdDate: Scalars['DateTime']['output'];
  creator?: Maybe<User>;
  creatorId: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  media?: Maybe<Scalars['String']['output']>;
  messageCount: Scalars['Int']['output'];
  messages?: Maybe<Array<Maybe<CommunityMessage>>>;
  photoUrl?: Maybe<Scalars['String']['output']>;
  requestCount: Scalars['Int']['output'];
  requests?: Maybe<Array<Maybe<CommunityRequest>>>;
  title?: Maybe<Scalars['String']['output']>;
  userCount: Scalars['Int']['output'];
  users?: Maybe<Array<Maybe<CommunityUser>>>;
};

/** A segment of a collection. */
export type CommunityCollectionSegment = {
  __typename?: 'CommunityCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Community>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type CommunityConnection = {
  __typename?: 'CommunityConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CommunityEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<Community>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type CommunityEdge = {
  __typename?: 'CommunityEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Community>;
};

export type CommunityFilterInput = {
  and?: InputMaybe<Array<CommunityFilterInput>>;
  communityType?: InputMaybe<CommunityTypeOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  creator?: InputMaybe<UserFilterInput>;
  creatorId?: InputMaybe<IntOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  media?: InputMaybe<StringOperationFilterInput>;
  messageCount?: InputMaybe<IntOperationFilterInput>;
  messages?: InputMaybe<ListFilterInputTypeOfCommunityMessageFilterInput>;
  or?: InputMaybe<Array<CommunityFilterInput>>;
  photoUrl?: InputMaybe<StringOperationFilterInput>;
  requestCount?: InputMaybe<IntOperationFilterInput>;
  requests?: InputMaybe<ListFilterInputTypeOfCommunityRequestFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
  userCount?: InputMaybe<IntOperationFilterInput>;
  users?: InputMaybe<ListFilterInputTypeOfCommunityUserFilterInput>;
};

export type CommunityInput = {
  communityType?: InputMaybe<CommunityType>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  media?: InputMaybe<Scalars['String']['input']>;
  photoUrl?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CommunityMessage = {
  __typename?: 'CommunityMessage';
  community?: Maybe<Community>;
  communityId: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type CommunityMessageFilterInput = {
  and?: InputMaybe<Array<CommunityMessageFilterInput>>;
  community?: InputMaybe<CommunityFilterInput>;
  communityId?: InputMaybe<IntOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  message?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CommunityMessageFilterInput>>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<IntOperationFilterInput>;
};

export type CommunityMessageInput = {
  communityId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
};

export type CommunityRequest = {
  __typename?: 'CommunityRequest';
  community?: Maybe<Community>;
  communityId: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type CommunityRequestFilterInput = {
  and?: InputMaybe<Array<CommunityRequestFilterInput>>;
  community?: InputMaybe<CommunityFilterInput>;
  communityId?: InputMaybe<IntOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<CommunityRequestFilterInput>>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<IntOperationFilterInput>;
};

export type CommunitySortInput = {
  communityType?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  creator?: InputMaybe<UserSortInput>;
  creatorId?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  media?: InputMaybe<SortEnumType>;
  messageCount?: InputMaybe<SortEnumType>;
  photoUrl?: InputMaybe<SortEnumType>;
  requestCount?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
  userCount?: InputMaybe<SortEnumType>;
};

export enum CommunityType {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

export type CommunityTypeOperationFilterInput = {
  eq?: InputMaybe<CommunityType>;
  in?: InputMaybe<Array<CommunityType>>;
  neq?: InputMaybe<CommunityType>;
  nin?: InputMaybe<Array<CommunityType>>;
};

export type CommunityUser = {
  __typename?: 'CommunityUser';
  community?: Maybe<Community>;
  communityId: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  mute: Scalars['Boolean']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type CommunityUserFilterInput = {
  and?: InputMaybe<Array<CommunityUserFilterInput>>;
  community?: InputMaybe<CommunityFilterInput>;
  communityId?: InputMaybe<IntOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  mute?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<CommunityUserFilterInput>>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<IntOperationFilterInput>;
};

export type CommunityUserInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  mute: Scalars['Boolean']['input'];
};

export type ConfirmEmailInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  tokenConfirmationCode?: InputMaybe<Scalars['String']['input']>;
};

export type ConfirmPhoneNumberInput = {
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  verificationCode?: InputMaybe<Scalars['String']['input']>;
};

export type Contact = {
  __typename?: 'Contact';
  contactUser?: Maybe<User>;
  contactUserId: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
};

/** A segment of a collection. */
export type ContactCollectionSegment = {
  __typename?: 'ContactCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Contact>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type ContactConnection = {
  __typename?: 'ContactConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ContactEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<Contact>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ContactEdge = {
  __typename?: 'ContactEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Contact>;
};

export type ContactFilterInput = {
  and?: InputMaybe<Array<ContactFilterInput>>;
  contactUser?: InputMaybe<UserFilterInput>;
  contactUserId?: InputMaybe<IntOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<ContactFilterInput>>;
};

export type ContactInput = {
  contactUserId: Scalars['Int']['input'];
};

export type ContactSortInput = {
  contactUser?: InputMaybe<UserSortInput>;
  contactUserId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
};

export type ContactUs = {
  __typename?: 'ContactUs';
  createdDate: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ContactUsInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Conversation = {
  __typename?: 'Conversation';
  createdDate: Scalars['DateTime']['output'];
  firstUnreadCount: Scalars['Int']['output'];
  firstUser?: Maybe<User>;
  firstUserId?: Maybe<Scalars['Int']['output']>;
  groupDescription?: Maybe<Scalars['String']['output']>;
  groupImgageUrl?: Maybe<Scalars['String']['output']>;
  groupName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isGroup: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  latestMessageDate: Scalars['DateTime']['output'];
  messages: Array<Message>;
  secondUnreadCount: Scalars['Int']['output'];
  secondUser?: Maybe<User>;
  secondUserId?: Maybe<Scalars['Int']['output']>;
  userGroups: Array<UserGroup>;
};

export type ConversationDto = {
  __typename?: 'ConversationDto';
  conversationId: Scalars['Int']['output'];
  groupImgageUrl?: Maybe<Scalars['String']['output']>;
  groupName?: Maybe<Scalars['String']['output']>;
  isGroup: Scalars['Boolean']['output'];
  lastMessage?: Maybe<Message>;
  latestMessageDate: Scalars['DateTime']['output'];
  receiver?: Maybe<Array<Maybe<User>>>;
  unreadCount: Scalars['Int']['output'];
};

export type ConversationDtoReceiverArgs = {
  where?: InputMaybe<UserFilterInput>;
};

/** A segment of a collection. */
export type ConversationDtoCollectionSegment = {
  __typename?: 'ConversationDtoCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<ConversationDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type ConversationDtoConnection = {
  __typename?: 'ConversationDtoConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ConversationDtoEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<ConversationDto>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ConversationDtoEdge = {
  __typename?: 'ConversationDtoEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<ConversationDto>;
};

export type ConversationDtoFilterInput = {
  and?: InputMaybe<Array<ConversationDtoFilterInput>>;
  conversationId?: InputMaybe<IntOperationFilterInput>;
  groupImgageUrl?: InputMaybe<StringOperationFilterInput>;
  groupName?: InputMaybe<StringOperationFilterInput>;
  isGroup?: InputMaybe<BooleanOperationFilterInput>;
  lastMessage?: InputMaybe<MessageFilterInput>;
  latestMessageDate?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<ConversationDtoFilterInput>>;
  receiver?: InputMaybe<ListFilterInputTypeOfUserFilterInput>;
  unreadCount?: InputMaybe<IntOperationFilterInput>;
};

export type ConversationDtoSortInput = {
  conversationId?: InputMaybe<SortEnumType>;
  groupImgageUrl?: InputMaybe<SortEnumType>;
  groupName?: InputMaybe<SortEnumType>;
  isGroup?: InputMaybe<SortEnumType>;
  lastMessage?: InputMaybe<MessageSortInput>;
  latestMessageDate?: InputMaybe<SortEnumType>;
  unreadCount?: InputMaybe<SortEnumType>;
};

export type ConversationFilterInput = {
  and?: InputMaybe<Array<ConversationFilterInput>>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  firstUnreadCount?: InputMaybe<IntOperationFilterInput>;
  firstUser?: InputMaybe<UserFilterInput>;
  firstUserId?: InputMaybe<IntOperationFilterInput>;
  groupDescription?: InputMaybe<StringOperationFilterInput>;
  groupImgageUrl?: InputMaybe<StringOperationFilterInput>;
  groupName?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isGroup?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  latestMessageDate?: InputMaybe<DateTimeOperationFilterInput>;
  messages?: InputMaybe<ListFilterInputTypeOfMessageFilterInput>;
  or?: InputMaybe<Array<ConversationFilterInput>>;
  secondUnreadCount?: InputMaybe<IntOperationFilterInput>;
  secondUser?: InputMaybe<UserFilterInput>;
  secondUserId?: InputMaybe<IntOperationFilterInput>;
  userGroups?: InputMaybe<ListFilterInputTypeOfUserGroupFilterInput>;
};

export type ConversationSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  firstUnreadCount?: InputMaybe<SortEnumType>;
  firstUser?: InputMaybe<UserSortInput>;
  firstUserId?: InputMaybe<SortEnumType>;
  groupDescription?: InputMaybe<SortEnumType>;
  groupImgageUrl?: InputMaybe<SortEnumType>;
  groupName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isGroup?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  latestMessageDate?: InputMaybe<SortEnumType>;
  secondUnreadCount?: InputMaybe<SortEnumType>;
  secondUser?: InputMaybe<UserSortInput>;
  secondUserId?: InputMaybe<SortEnumType>;
};

export type CustomerDto = {
  __typename?: 'CustomerDto';
  address?: Maybe<AddressDto>;
  balance: Scalars['Long']['output'];
  created: Scalars['DateTime']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  invoicePrefix?: Maybe<Scalars['String']['output']>;
  livemode: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  object?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type CustomerDtoCollectionSegment = {
  __typename?: 'CustomerDtoCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<CustomerDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type CustomerDtoConnection = {
  __typename?: 'CustomerDtoConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CustomerDtoEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<CustomerDto>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type CustomerDtoEdge = {
  __typename?: 'CustomerDtoEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<CustomerDto>;
};

export type CustomerDtoFilterInput = {
  address?: InputMaybe<AddressDtoFilterInput>;
  and?: InputMaybe<Array<CustomerDtoFilterInput>>;
  balance?: InputMaybe<LongOperationFilterInput>;
  created?: InputMaybe<DateTimeOperationFilterInput>;
  currency?: InputMaybe<StringOperationFilterInput>;
  deleted?: InputMaybe<BooleanOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<StringOperationFilterInput>;
  invoicePrefix?: InputMaybe<StringOperationFilterInput>;
  livemode?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  object?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CustomerDtoFilterInput>>;
};

export type CustomerDtoSortInput = {
  address?: InputMaybe<AddressDtoSortInput>;
  balance?: InputMaybe<SortEnumType>;
  created?: InputMaybe<SortEnumType>;
  currency?: InputMaybe<SortEnumType>;
  deleted?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  email?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  invoicePrefix?: InputMaybe<SortEnumType>;
  livemode?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  object?: InputMaybe<SortEnumType>;
};

export type DashboardCollaborativeDto = {
  __typename?: 'DashboardCollaborativeDto';
  collaborate: Scalars['Int']['output'];
  investment: Scalars['Int']['output'];
  promotion: Scalars['Int']['output'];
};

export type DashboardContentChartDto = {
  __typename?: 'DashboardContentChartDto';
  x?: Maybe<Scalars['String']['output']>;
  y: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type DashboardContentChartDtoCollectionSegment = {
  __typename?: 'DashboardContentChartDtoCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<DashboardContentChartDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type DashboardContentChartDtoConnection = {
  __typename?: 'DashboardContentChartDtoConnection';
  /** A list of edges. */
  edges?: Maybe<Array<DashboardContentChartDtoEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<DashboardContentChartDto>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type DashboardContentChartDtoEdge = {
  __typename?: 'DashboardContentChartDtoEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<DashboardContentChartDto>;
};

export type DashboardContentChartDtoFilterInput = {
  and?: InputMaybe<Array<DashboardContentChartDtoFilterInput>>;
  or?: InputMaybe<Array<DashboardContentChartDtoFilterInput>>;
  x?: InputMaybe<StringOperationFilterInput>;
  y?: InputMaybe<IntOperationFilterInput>;
};

export type DashboardContentChartDtoSortInput = {
  x?: InputMaybe<SortEnumType>;
  y?: InputMaybe<SortEnumType>;
};

export enum DashboardPeriod {
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
}

export type DashboardSummaryDto = {
  __typename?: 'DashboardSummaryDto';
  communityCount: Scalars['Int']['output'];
  communityPercent: Scalars['Int']['output'];
  contentCount: Scalars['Int']['output'];
  contentPercent: Scalars['Int']['output'];
  monetizedAmount: Scalars['Decimal']['output'];
  monetizedPercent: Scalars['Decimal']['output'];
  userCount: Scalars['Int']['output'];
  userPercent: Scalars['Int']['output'];
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DecimalOperationFilterInput = {
  eq?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  neq?: InputMaybe<Scalars['Decimal']['input']>;
  ngt?: InputMaybe<Scalars['Decimal']['input']>;
  ngte?: InputMaybe<Scalars['Decimal']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  nlt?: InputMaybe<Scalars['Decimal']['input']>;
  nlte?: InputMaybe<Scalars['Decimal']['input']>;
};

export type DefaultViolation = {
  __typename?: 'DefaultViolation';
  content: Scalars['String']['output'];
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  violationReports?: Maybe<Array<ViolationReport>>;
};

/** A segment of a collection. */
export type DefaultViolationCollectionSegment = {
  __typename?: 'DefaultViolationCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<DefaultViolation>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type DefaultViolationConnection = {
  __typename?: 'DefaultViolationConnection';
  /** A list of edges. */
  edges?: Maybe<Array<DefaultViolationEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<DefaultViolation>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type DefaultViolationEdge = {
  __typename?: 'DefaultViolationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<DefaultViolation>;
};

export type DefaultViolationFilterInput = {
  and?: InputMaybe<Array<DefaultViolationFilterInput>>;
  content?: InputMaybe<StringOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<DefaultViolationFilterInput>>;
  violationReports?: InputMaybe<ListFilterInputTypeOfViolationReportFilterInput>;
};

export type DefaultViolationInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type DefaultViolationSortInput = {
  content?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
};

export enum Dimension {
  Collapse = 'COLLAPSE',
  Curve = 'CURVE',
  Dontcare = 'DONTCARE',
  False = 'FALSE',
  Point = 'POINT',
  Surface = 'SURFACE',
  True = 'TRUE',
}

export type DimensionOperationFilterInput = {
  eq?: InputMaybe<Dimension>;
  in?: InputMaybe<Array<Dimension>>;
  neq?: InputMaybe<Dimension>;
  nin?: InputMaybe<Array<Dimension>>;
};

export type DisabledNotificationFromUser = {
  __typename?: 'DisabledNotificationFromUser';
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  targetUser?: Maybe<User>;
  targetUserId: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type DisabledNotificationFromUserCollectionSegment = {
  __typename?: 'DisabledNotificationFromUserCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<DisabledNotificationFromUser>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type DisabledNotificationFromUserConnection = {
  __typename?: 'DisabledNotificationFromUserConnection';
  /** A list of edges. */
  edges?: Maybe<Array<DisabledNotificationFromUserEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<DisabledNotificationFromUser>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type DisabledNotificationFromUserEdge = {
  __typename?: 'DisabledNotificationFromUserEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<DisabledNotificationFromUser>;
};

export type DisabledNotificationFromUserFilterInput = {
  and?: InputMaybe<Array<DisabledNotificationFromUserFilterInput>>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<DisabledNotificationFromUserFilterInput>>;
  targetUser?: InputMaybe<UserFilterInput>;
  targetUserId?: InputMaybe<IntOperationFilterInput>;
};

export type DisabledNotificationFromUserSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  targetUser?: InputMaybe<UserSortInput>;
  targetUserId?: InputMaybe<SortEnumType>;
};

export type DisputeDto = {
  __typename?: 'DisputeDto';
  amount?: Maybe<Scalars['Long']['output']>;
  charge?: Maybe<ChargeDto>;
  chargeId?: Maybe<Scalars['String']['output']>;
  created: Scalars['DateTime']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isChargeRefundable: Scalars['Boolean']['output'];
  livemode: Scalars['Boolean']['output'];
  metadata?: Maybe<Array<KeyValuePairOfStringAndString>>;
  networkReasonCode?: Maybe<Scalars['String']['output']>;
  object?: Maybe<Scalars['String']['output']>;
  paymentIntentId?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type DisputeDtoCollectionSegment = {
  __typename?: 'DisputeDtoCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<DisputeDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type DisputeDtoConnection = {
  __typename?: 'DisputeDtoConnection';
  /** A list of edges. */
  edges?: Maybe<Array<DisputeDtoEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<DisputeDto>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type DisputeDtoEdge = {
  __typename?: 'DisputeDtoEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<DisputeDto>;
};

export type DisputeDtoFilterInput = {
  amount?: InputMaybe<LongOperationFilterInput>;
  and?: InputMaybe<Array<DisputeDtoFilterInput>>;
  charge?: InputMaybe<ChargeDtoFilterInput>;
  chargeId?: InputMaybe<StringOperationFilterInput>;
  created?: InputMaybe<DateTimeOperationFilterInput>;
  currency?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<StringOperationFilterInput>;
  isChargeRefundable?: InputMaybe<BooleanOperationFilterInput>;
  livemode?: InputMaybe<BooleanOperationFilterInput>;
  metadata?: InputMaybe<ListFilterInputTypeOfKeyValuePairOfStringAndStringFilterInput>;
  networkReasonCode?: InputMaybe<StringOperationFilterInput>;
  object?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<DisputeDtoFilterInput>>;
  paymentIntentId?: InputMaybe<StringOperationFilterInput>;
  reason?: InputMaybe<StringOperationFilterInput>;
  status?: InputMaybe<StringOperationFilterInput>;
};

export type DisputeDtoSortInput = {
  amount?: InputMaybe<SortEnumType>;
  charge?: InputMaybe<ChargeDtoSortInput>;
  chargeId?: InputMaybe<SortEnumType>;
  created?: InputMaybe<SortEnumType>;
  currency?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isChargeRefundable?: InputMaybe<SortEnumType>;
  livemode?: InputMaybe<SortEnumType>;
  networkReasonCode?: InputMaybe<SortEnumType>;
  object?: InputMaybe<SortEnumType>;
  paymentIntentId?: InputMaybe<SortEnumType>;
  reason?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
};

export type EmailAttachmentDefInput = {
  fileName: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type EmailInput = {
  attachments?: InputMaybe<Array<EmailAttachmentDefInput>>;
  htmlContent?: InputMaybe<Scalars['String']['input']>;
  plainTextContent?: InputMaybe<Scalars['String']['input']>;
  subject: Scalars['String']['input'];
  toEmailAddress: Scalars['String']['input'];
  toName?: InputMaybe<Scalars['String']['input']>;
};

export type FloatOperationFilterInput = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
  ngt?: InputMaybe<Scalars['Float']['input']>;
  ngte?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  nlt?: InputMaybe<Scalars['Float']['input']>;
  nlte?: InputMaybe<Scalars['Float']['input']>;
};

export type FollowSummaryDto = {
  __typename?: 'FollowSummaryDto';
  followCount: Scalars['Int']['output'];
  mutualFollowCount: Scalars['Int']['output'];
  unfollowCount: Scalars['Int']['output'];
};

export type Follower = {
  __typename?: 'Follower';
  createdDate: Scalars['DateTime']['output'];
  followed?: Maybe<User>;
  followedId: Scalars['Int']['output'];
  follower?: Maybe<User>;
  followerId: Scalars['Int']['output'];
  hideStory: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  isAccepted: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isMutual: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
};

/** A segment of a collection. */
export type FollowerCollectionSegment = {
  __typename?: 'FollowerCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Follower>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type FollowerConnection = {
  __typename?: 'FollowerConnection';
  /** A list of edges. */
  edges?: Maybe<Array<FollowerEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<Follower>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type FollowerEdge = {
  __typename?: 'FollowerEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Follower>;
};

export type FollowerFilterInput = {
  and?: InputMaybe<Array<FollowerFilterInput>>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  followed?: InputMaybe<UserFilterInput>;
  followedId?: InputMaybe<IntOperationFilterInput>;
  follower?: InputMaybe<UserFilterInput>;
  followerId?: InputMaybe<IntOperationFilterInput>;
  hideStory?: InputMaybe<BooleanOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isAccepted?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isMutual?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<FollowerFilterInput>>;
};

export type FollowerFolloweeDto = {
  __typename?: 'FollowerFolloweeDto';
  followedByCurrentUser: Scalars['Boolean']['output'];
  followerOfCurrentUser: Scalars['Boolean']['output'];
  isFollower: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

/** A segment of a collection. */
export type FollowerFolloweeDtoCollectionSegment = {
  __typename?: 'FollowerFolloweeDtoCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<FollowerFolloweeDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type FollowerFolloweeDtoConnection = {
  __typename?: 'FollowerFolloweeDtoConnection';
  /** A list of edges. */
  edges?: Maybe<Array<FollowerFolloweeDtoEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<FollowerFolloweeDto>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type FollowerFolloweeDtoEdge = {
  __typename?: 'FollowerFolloweeDtoEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<FollowerFolloweeDto>;
};

export type FollowerFolloweeDtoFilterInput = {
  and?: InputMaybe<Array<FollowerFolloweeDtoFilterInput>>;
  followedByCurrentUser?: InputMaybe<BooleanOperationFilterInput>;
  followerOfCurrentUser?: InputMaybe<BooleanOperationFilterInput>;
  isFollower?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<FollowerFolloweeDtoFilterInput>>;
  user?: InputMaybe<UserFilterInput>;
};

export type FollowerFolloweeDtoSortInput = {
  followedByCurrentUser?: InputMaybe<SortEnumType>;
  followerOfCurrentUser?: InputMaybe<SortEnumType>;
  isFollower?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
};

export type FollowerInput = {
  followedId: Scalars['Int']['input'];
};

export type FollowerSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  followed?: InputMaybe<UserSortInput>;
  followedId?: InputMaybe<SortEnumType>;
  follower?: InputMaybe<UserSortInput>;
  followerId?: InputMaybe<SortEnumType>;
  hideStory?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isAccepted?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isMutual?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Others = 'OTHERS',
}

export enum GeoJsonGeometryType {
  GeometryCollection = 'GeometryCollection',
  LineString = 'LineString',
  MultiLineString = 'MultiLineString',
  MultiPoint = 'MultiPoint',
  MultiPolygon = 'MultiPolygon',
  Point = 'Point',
  Polygon = 'Polygon',
}

export type GeoJsonInterface = {
  /** The minimum bounding box around the geometry object */
  bbox?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
  /** The coordinate reference system integer identifier */
  crs?: Maybe<Scalars['Int']['output']>;
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonLineStringInput = {
  /** The "coordinates" field is an array of two or more positions. */
  coordinates?: InputMaybe<Array<InputMaybe<Scalars['Position']['input']>>>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']['input']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonLineStringType = GeoJsonInterface & {
  __typename?: 'GeoJSONLineStringType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']['output']>;
  /** The "coordinates" field is an array of two or more positions. */
  coordinates?: Maybe<Array<Maybe<Scalars['Position']['output']>>>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int']['output'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonMultiLineStringInput = {
  /** The "coordinates" field is an array of LineString coordinate arrays. */
  coordinates?: InputMaybe<
    Array<InputMaybe<Array<InputMaybe<Scalars['Position']['input']>>>>
  >;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']['input']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonMultiLineStringType = GeoJsonInterface & {
  __typename?: 'GeoJSONMultiLineStringType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']['output']>;
  /** The "coordinates" field is an array of LineString coordinate arrays. */
  coordinates?: Maybe<Array<Maybe<Scalars['Position']['output']>>>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int']['output'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonMultiPointInput = {
  /** The "coordinates" field is an array of positions. */
  coordinates?: InputMaybe<Array<InputMaybe<Scalars['Position']['input']>>>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']['input']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonMultiPointType = GeoJsonInterface & {
  __typename?: 'GeoJSONMultiPointType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']['output']>;
  /** The "coordinates" field is an array of positions. */
  coordinates?: Maybe<Array<Maybe<Scalars['Position']['output']>>>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int']['output'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonMultiPolygonInput = {
  /** The "coordinates" field is an array of Polygon coordinate arrays. */
  coordinates?: InputMaybe<Scalars['Coordinates']['input']>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']['input']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonMultiPolygonType = GeoJsonInterface & {
  __typename?: 'GeoJSONMultiPolygonType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']['output']>;
  /** The "coordinates" field is an array of Polygon coordinate arrays. */
  coordinates?: Maybe<Scalars['Coordinates']['output']>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int']['output'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonPointInput = {
  /** The "coordinates" field is a single position. */
  coordinates?: InputMaybe<Scalars['Position']['input']>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']['input']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonPointType = GeoJsonInterface & {
  __typename?: 'GeoJSONPointType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']['output']>;
  /** The "coordinates" field is a single position. */
  coordinates?: Maybe<Scalars['Position']['output']>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int']['output'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonPolygonInput = {
  /** The "coordinates" field MUST be an array of linear ring coordinate arrays. For Polygons with more than one of these rings, the first MUST be the exterior ring, and any others MUST be interior rings. The exterior ring bounds the surface, and the interior rings (if present) bound holes within the surface. */
  coordinates?: InputMaybe<
    Array<InputMaybe<Array<InputMaybe<Scalars['Position']['input']>>>>
  >;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']['input']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonPolygonType = GeoJsonInterface & {
  __typename?: 'GeoJSONPolygonType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']['output']>;
  /** The "coordinates" field MUST be an array of linear ring coordinate arrays. For Polygons with more than one of these rings, the first MUST be the exterior ring, and any others MUST be interior rings. The exterior ring bounds the surface, and the interior rings (if present) bound holes within the surface. */
  coordinates?: Maybe<
    Array<Maybe<Array<Maybe<Scalars['Position']['output']>>>>
  >;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int']['output'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeometryContainsOperationFilterInput = {
  buffer?: InputMaybe<Scalars['Float']['input']>;
  geometry: Scalars['Geometry']['input'];
};

export type GeometryDistanceOperationFilterInput = {
  buffer?: InputMaybe<Scalars['Float']['input']>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  geometry: Scalars['Geometry']['input'];
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
  ngt?: InputMaybe<Scalars['Float']['input']>;
  ngte?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<Scalars['Float']['input']>>;
  nlt?: InputMaybe<Scalars['Float']['input']>;
  nlte?: InputMaybe<Scalars['Float']['input']>;
};

export type GeometryFilterInput = {
  and?: InputMaybe<Array<GeometryFilterInput>>;
  area?: InputMaybe<FloatOperationFilterInput>;
  boundary?: InputMaybe<GeometryFilterInput>;
  centroid?: InputMaybe<PointFilterInput>;
  contains?: InputMaybe<GeometryContainsOperationFilterInput>;
  dimension?: InputMaybe<DimensionOperationFilterInput>;
  distance?: InputMaybe<GeometryDistanceOperationFilterInput>;
  envelope?: InputMaybe<GeometryFilterInput>;
  geometryType?: InputMaybe<StringOperationFilterInput>;
  interiorPoint?: InputMaybe<PointFilterInput>;
  intersects?: InputMaybe<GeometryIntersectsOperationFilterInput>;
  isSimple?: InputMaybe<BooleanOperationFilterInput>;
  isValid?: InputMaybe<BooleanOperationFilterInput>;
  length?: InputMaybe<FloatOperationFilterInput>;
  ncontains?: InputMaybe<GeometryContainsOperationFilterInput>;
  nintersects?: InputMaybe<GeometryIntersectsOperationFilterInput>;
  noverlaps?: InputMaybe<GeometryOverlapsOperationFilterInput>;
  ntouches?: InputMaybe<GeometryTouchesOperationFilterInput>;
  numPoints?: InputMaybe<IntOperationFilterInput>;
  nwithin?: InputMaybe<GeometryWithinOperationFilterInput>;
  ogcGeometryType?: InputMaybe<OgcGeometryTypeOperationFilterInput>;
  or?: InputMaybe<Array<GeometryFilterInput>>;
  overlaps?: InputMaybe<GeometryOverlapsOperationFilterInput>;
  pointOnSurface?: InputMaybe<PointFilterInput>;
  srid?: InputMaybe<IntOperationFilterInput>;
  touches?: InputMaybe<GeometryTouchesOperationFilterInput>;
  within?: InputMaybe<GeometryWithinOperationFilterInput>;
};

export type GeometryIntersectsOperationFilterInput = {
  buffer?: InputMaybe<Scalars['Float']['input']>;
  geometry: Scalars['Geometry']['input'];
};

export type GeometryOverlapsOperationFilterInput = {
  buffer?: InputMaybe<Scalars['Float']['input']>;
  geometry: Scalars['Geometry']['input'];
};

export type GeometryTouchesOperationFilterInput = {
  buffer?: InputMaybe<Scalars['Float']['input']>;
  geometry: Scalars['Geometry']['input'];
};

export type GeometryWithinOperationFilterInput = {
  buffer?: InputMaybe<Scalars['Float']['input']>;
  geometry: Scalars['Geometry']['input'];
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type Invite = {
  __typename?: 'Invite';
  code?: Maybe<Scalars['String']['output']>;
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  invited?: Maybe<User>;
  invitedId?: Maybe<Scalars['Int']['output']>;
  inviter?: Maybe<User>;
  inviterId: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  link?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type InviteCollectionSegment = {
  __typename?: 'InviteCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Invite>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type InviteConnection = {
  __typename?: 'InviteConnection';
  /** A list of edges. */
  edges?: Maybe<Array<InviteEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<Invite>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type InviteEdge = {
  __typename?: 'InviteEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Invite>;
};

export type InviteFilterInput = {
  and?: InputMaybe<Array<InviteFilterInput>>;
  code?: InputMaybe<StringOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  invited?: InputMaybe<UserFilterInput>;
  invitedId?: InputMaybe<IntOperationFilterInput>;
  inviter?: InputMaybe<UserFilterInput>;
  inviterId?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  link?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<InviteFilterInput>>;
};

export type InviteSortInput = {
  code?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  invited?: InputMaybe<UserSortInput>;
  invitedId?: InputMaybe<SortEnumType>;
  inviter?: InputMaybe<UserSortInput>;
  inviterId?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  link?: InputMaybe<SortEnumType>;
};

export type KeyValuePairOfStringAndString = {
  __typename?: 'KeyValuePairOfStringAndString';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type KeyValuePairOfStringAndStringFilterInput = {
  and?: InputMaybe<Array<KeyValuePairOfStringAndStringFilterInput>>;
  key?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<KeyValuePairOfStringAndStringFilterInput>>;
  value?: InputMaybe<StringOperationFilterInput>;
};

export type KeyValuePairOfStringAndStringInput = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type ListFilterInputTypeOfCategoryFilterInput = {
  all?: InputMaybe<CategoryFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<CategoryFilterInput>;
  some?: InputMaybe<CategoryFilterInput>;
};

export type ListFilterInputTypeOfChannelRecordFilterInput = {
  all?: InputMaybe<ChannelRecordFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ChannelRecordFilterInput>;
  some?: InputMaybe<ChannelRecordFilterInput>;
};

export type ListFilterInputTypeOfCommunityMessageFilterInput = {
  all?: InputMaybe<CommunityMessageFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<CommunityMessageFilterInput>;
  some?: InputMaybe<CommunityMessageFilterInput>;
};

export type ListFilterInputTypeOfCommunityRequestFilterInput = {
  all?: InputMaybe<CommunityRequestFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<CommunityRequestFilterInput>;
  some?: InputMaybe<CommunityRequestFilterInput>;
};

export type ListFilterInputTypeOfCommunityUserFilterInput = {
  all?: InputMaybe<CommunityUserFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<CommunityUserFilterInput>;
  some?: InputMaybe<CommunityUserFilterInput>;
};

export type ListFilterInputTypeOfFollowerFilterInput = {
  all?: InputMaybe<FollowerFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<FollowerFilterInput>;
  some?: InputMaybe<FollowerFilterInput>;
};

export type ListFilterInputTypeOfKeyValuePairOfStringAndStringFilterInput = {
  all?: InputMaybe<KeyValuePairOfStringAndStringFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<KeyValuePairOfStringAndStringFilterInput>;
  some?: InputMaybe<KeyValuePairOfStringAndStringFilterInput>;
};

export type ListFilterInputTypeOfLiveCommentFilterInput = {
  all?: InputMaybe<LiveCommentFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<LiveCommentFilterInput>;
  some?: InputMaybe<LiveCommentFilterInput>;
};

export type ListFilterInputTypeOfLiveFilterInput = {
  all?: InputMaybe<LiveFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<LiveFilterInput>;
  some?: InputMaybe<LiveFilterInput>;
};

export type ListFilterInputTypeOfLiveRoleFilterInput = {
  all?: InputMaybe<LiveRoleFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<LiveRoleFilterInput>;
  some?: InputMaybe<LiveRoleFilterInput>;
};

export type ListFilterInputTypeOfMessageFilterInput = {
  all?: InputMaybe<MessageFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<MessageFilterInput>;
  some?: InputMaybe<MessageFilterInput>;
};

export type ListFilterInputTypeOfUserFilterInput = {
  all?: InputMaybe<UserFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<UserFilterInput>;
  some?: InputMaybe<UserFilterInput>;
};

export type ListFilterInputTypeOfUserGroupFilterInput = {
  all?: InputMaybe<UserGroupFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<UserGroupFilterInput>;
  some?: InputMaybe<UserGroupFilterInput>;
};

export type ListFilterInputTypeOfViolationReportFilterInput = {
  all?: InputMaybe<ViolationReportFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ViolationReportFilterInput>;
  some?: InputMaybe<ViolationReportFilterInput>;
};

export type ListResponseBaseOfBalanceTransactionDto = {
  __typename?: 'ListResponseBaseOfBalanceTransactionDto';
  result?: Maybe<BalanceTransactionDtoCollectionSegment>;
  result2?: Maybe<BalanceTransactionDtoConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfBalanceTransactionDtoResultArgs = {
  order?: InputMaybe<Array<BalanceTransactionDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BalanceTransactionDtoFilterInput>;
};

export type ListResponseBaseOfBalanceTransactionDtoResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<BalanceTransactionDtoSortInput>>;
  where?: InputMaybe<BalanceTransactionDtoFilterInput>;
};

export type ListResponseBaseOfCategory = {
  __typename?: 'ListResponseBaseOfCategory';
  result?: Maybe<CategoryCollectionSegment>;
  result2?: Maybe<CategoryConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfCategoryResultArgs = {
  order?: InputMaybe<Array<CategorySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CategoryFilterInput>;
};

export type ListResponseBaseOfCategoryResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CategorySortInput>>;
  where?: InputMaybe<CategoryFilterInput>;
};

export type ListResponseBaseOfChargeDto = {
  __typename?: 'ListResponseBaseOfChargeDto';
  result?: Maybe<ChargeDtoCollectionSegment>;
  result2?: Maybe<ChargeDtoConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfChargeDtoResultArgs = {
  order?: InputMaybe<Array<ChargeDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ChargeDtoFilterInput>;
};

export type ListResponseBaseOfChargeDtoResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ChargeDtoSortInput>>;
  where?: InputMaybe<ChargeDtoFilterInput>;
};

export type ListResponseBaseOfCommunity = {
  __typename?: 'ListResponseBaseOfCommunity';
  result?: Maybe<CommunityCollectionSegment>;
  result2?: Maybe<CommunityConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfCommunityResultArgs = {
  order?: InputMaybe<Array<CommunitySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CommunityFilterInput>;
};

export type ListResponseBaseOfCommunityResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CommunitySortInput>>;
  where?: InputMaybe<CommunityFilterInput>;
};

export type ListResponseBaseOfContact = {
  __typename?: 'ListResponseBaseOfContact';
  result?: Maybe<ContactCollectionSegment>;
  result2?: Maybe<ContactConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfContactResultArgs = {
  order?: InputMaybe<Array<ContactSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ContactFilterInput>;
};

export type ListResponseBaseOfContactResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ContactSortInput>>;
  where?: InputMaybe<ContactFilterInput>;
};

export type ListResponseBaseOfConversationDto = {
  __typename?: 'ListResponseBaseOfConversationDto';
  result?: Maybe<ConversationDtoCollectionSegment>;
  result2?: Maybe<ConversationDtoConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfConversationDtoResultArgs = {
  order?: InputMaybe<Array<ConversationDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ConversationDtoFilterInput>;
};

export type ListResponseBaseOfConversationDtoResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ConversationDtoSortInput>>;
  where?: InputMaybe<ConversationDtoFilterInput>;
};

export type ListResponseBaseOfCustomerDto = {
  __typename?: 'ListResponseBaseOfCustomerDto';
  result?: Maybe<CustomerDtoCollectionSegment>;
  result2?: Maybe<CustomerDtoConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfCustomerDtoResultArgs = {
  order?: InputMaybe<Array<CustomerDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CustomerDtoFilterInput>;
};

export type ListResponseBaseOfCustomerDtoResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CustomerDtoSortInput>>;
  where?: InputMaybe<CustomerDtoFilterInput>;
};

export type ListResponseBaseOfDashboardContentChartDto = {
  __typename?: 'ListResponseBaseOfDashboardContentChartDto';
  result?: Maybe<DashboardContentChartDtoCollectionSegment>;
  result2?: Maybe<DashboardContentChartDtoConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfDashboardContentChartDtoResultArgs = {
  order?: InputMaybe<Array<DashboardContentChartDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DashboardContentChartDtoFilterInput>;
};

export type ListResponseBaseOfDashboardContentChartDtoResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<DashboardContentChartDtoSortInput>>;
  where?: InputMaybe<DashboardContentChartDtoFilterInput>;
};

export type ListResponseBaseOfDefaultViolation = {
  __typename?: 'ListResponseBaseOfDefaultViolation';
  result?: Maybe<DefaultViolationCollectionSegment>;
  result2?: Maybe<DefaultViolationConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfDefaultViolationResultArgs = {
  order?: InputMaybe<Array<DefaultViolationSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DefaultViolationFilterInput>;
};

export type ListResponseBaseOfDefaultViolationResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<DefaultViolationSortInput>>;
  where?: InputMaybe<DefaultViolationFilterInput>;
};

export type ListResponseBaseOfDisabledNotificationFromUser = {
  __typename?: 'ListResponseBaseOfDisabledNotificationFromUser';
  result?: Maybe<DisabledNotificationFromUserCollectionSegment>;
  result2?: Maybe<DisabledNotificationFromUserConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfDisabledNotificationFromUserResultArgs = {
  order?: InputMaybe<Array<DisabledNotificationFromUserSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DisabledNotificationFromUserFilterInput>;
};

export type ListResponseBaseOfDisabledNotificationFromUserResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<DisabledNotificationFromUserSortInput>>;
  where?: InputMaybe<DisabledNotificationFromUserFilterInput>;
};

export type ListResponseBaseOfDisputeDto = {
  __typename?: 'ListResponseBaseOfDisputeDto';
  result?: Maybe<DisputeDtoCollectionSegment>;
  result2?: Maybe<DisputeDtoConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfDisputeDtoResultArgs = {
  order?: InputMaybe<Array<DisputeDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DisputeDtoFilterInput>;
};

export type ListResponseBaseOfDisputeDtoResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<DisputeDtoSortInput>>;
  where?: InputMaybe<DisputeDtoFilterInput>;
};

export type ListResponseBaseOfFollower = {
  __typename?: 'ListResponseBaseOfFollower';
  result?: Maybe<FollowerCollectionSegment>;
  result2?: Maybe<FollowerConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfFollowerResultArgs = {
  order?: InputMaybe<Array<FollowerSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FollowerFilterInput>;
};

export type ListResponseBaseOfFollowerResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<FollowerSortInput>>;
  where?: InputMaybe<FollowerFilterInput>;
};

export type ListResponseBaseOfFollowerFolloweeDto = {
  __typename?: 'ListResponseBaseOfFollowerFolloweeDto';
  result?: Maybe<FollowerFolloweeDtoCollectionSegment>;
  result2?: Maybe<FollowerFolloweeDtoConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfFollowerFolloweeDtoResultArgs = {
  order?: InputMaybe<Array<FollowerFolloweeDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FollowerFolloweeDtoFilterInput>;
};

export type ListResponseBaseOfFollowerFolloweeDtoResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<FollowerFolloweeDtoSortInput>>;
  where?: InputMaybe<FollowerFolloweeDtoFilterInput>;
};

export type ListResponseBaseOfInvite = {
  __typename?: 'ListResponseBaseOfInvite';
  result?: Maybe<InviteCollectionSegment>;
  result2?: Maybe<InviteConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfInviteResultArgs = {
  order?: InputMaybe<Array<InviteSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<InviteFilterInput>;
};

export type ListResponseBaseOfInviteResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InviteSortInput>>;
  where?: InputMaybe<InviteFilterInput>;
};

export type ListResponseBaseOfLiveCommentDto = {
  __typename?: 'ListResponseBaseOfLiveCommentDto';
  result?: Maybe<LiveCommentDtoCollectionSegment>;
  result2?: Maybe<LiveCommentDtoConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfLiveCommentDtoResultArgs = {
  order?: InputMaybe<Array<LiveCommentDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LiveCommentDtoFilterInput>;
};

export type ListResponseBaseOfLiveCommentDtoResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<LiveCommentDtoSortInput>>;
  where?: InputMaybe<LiveCommentDtoFilterInput>;
};

export type ListResponseBaseOfLiveDto = {
  __typename?: 'ListResponseBaseOfLiveDto';
  result?: Maybe<LiveDtoCollectionSegment>;
  result2?: Maybe<LiveDtoConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfLiveDtoResultArgs = {
  order?: InputMaybe<Array<LiveDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LiveDtoFilterInput>;
};

export type ListResponseBaseOfLiveDtoResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<LiveDtoSortInput>>;
  where?: InputMaybe<LiveDtoFilterInput>;
};

export type ListResponseBaseOfLoginActivity = {
  __typename?: 'ListResponseBaseOfLoginActivity';
  result?: Maybe<LoginActivityCollectionSegment>;
  result2?: Maybe<LoginActivityConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfLoginActivityResultArgs = {
  order?: InputMaybe<Array<LoginActivitySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LoginActivityFilterInput>;
};

export type ListResponseBaseOfLoginActivityResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<LoginActivitySortInput>>;
  where?: InputMaybe<LoginActivityFilterInput>;
};

export type ListResponseBaseOfMessage = {
  __typename?: 'ListResponseBaseOfMessage';
  result?: Maybe<MessageCollectionSegment>;
  result2?: Maybe<MessageConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfMessageResultArgs = {
  order?: InputMaybe<Array<MessageSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MessageFilterInput>;
};

export type ListResponseBaseOfMessageResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<MessageSortInput>>;
  where?: InputMaybe<MessageFilterInput>;
};

export type ListResponseBaseOfNotification = {
  __typename?: 'ListResponseBaseOfNotification';
  result?: Maybe<NotificationCollectionSegment>;
  result2?: Maybe<NotificationConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfNotificationResultArgs = {
  order?: InputMaybe<Array<NotificationSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<NotificationFilterInput>;
};

export type ListResponseBaseOfNotificationResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<NotificationSortInput>>;
  where?: InputMaybe<NotificationFilterInput>;
};

export type ListResponseBaseOfNotificationSettings = {
  __typename?: 'ListResponseBaseOfNotificationSettings';
  result?: Maybe<NotificationSettingsCollectionSegment>;
  result2?: Maybe<NotificationSettingsConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfNotificationSettingsResultArgs = {
  order?: InputMaybe<Array<NotificationSettingsSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<NotificationSettingsFilterInput>;
};

export type ListResponseBaseOfNotificationSettingsResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<NotificationSettingsSortInput>>;
  where?: InputMaybe<NotificationSettingsFilterInput>;
};

export type ListResponseBaseOfPlanDto = {
  __typename?: 'ListResponseBaseOfPlanDto';
  result?: Maybe<PlanDtoCollectionSegment>;
  result2?: Maybe<PlanDtoConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfPlanDtoResultArgs = {
  order?: InputMaybe<Array<PlanDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PlanDtoFilterInput>;
};

export type ListResponseBaseOfPlanDtoResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<PlanDtoSortInput>>;
  where?: InputMaybe<PlanDtoFilterInput>;
};

export type ListResponseBaseOfRecordFileDto = {
  __typename?: 'ListResponseBaseOfRecordFileDto';
  result?: Maybe<RecordFileDtoCollectionSegment>;
  result2?: Maybe<RecordFileDtoConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfRecordFileDtoResultArgs = {
  order?: InputMaybe<Array<RecordFileDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RecordFileDtoFilterInput>;
};

export type ListResponseBaseOfRecordFileDtoResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<RecordFileDtoSortInput>>;
  where?: InputMaybe<RecordFileDtoFilterInput>;
};

export type ListResponseBaseOfRefundDto = {
  __typename?: 'ListResponseBaseOfRefundDto';
  result?: Maybe<RefundDtoCollectionSegment>;
  result2?: Maybe<RefundDtoConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfRefundDtoResultArgs = {
  order?: InputMaybe<Array<RefundDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RefundDtoFilterInput>;
};

export type ListResponseBaseOfRefundDtoResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<RefundDtoSortInput>>;
  where?: InputMaybe<RefundDtoFilterInput>;
};

export type ListResponseBaseOfRequestForVerification = {
  __typename?: 'ListResponseBaseOfRequestForVerification';
  result?: Maybe<RequestForVerificationCollectionSegment>;
  result2?: Maybe<RequestForVerificationConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfRequestForVerificationResultArgs = {
  order?: InputMaybe<Array<RequestForVerificationSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RequestForVerificationFilterInput>;
};

export type ListResponseBaseOfRequestForVerificationResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<RequestForVerificationSortInput>>;
  where?: InputMaybe<RequestForVerificationFilterInput>;
};

export type ListResponseBaseOfRole = {
  __typename?: 'ListResponseBaseOfRole';
  result?: Maybe<RoleCollectionSegment>;
  result2?: Maybe<RoleConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfRoleResultArgs = {
  order?: InputMaybe<Array<RoleSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RoleFilterInput>;
};

export type ListResponseBaseOfRoleResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<RoleSortInput>>;
  where?: InputMaybe<RoleFilterInput>;
};

export type ListResponseBaseOfStripePaymentMethod = {
  __typename?: 'ListResponseBaseOfStripePaymentMethod';
  result?: Maybe<StripePaymentMethodCollectionSegment>;
  result2?: Maybe<StripePaymentMethodConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfStripePaymentMethodResultArgs = {
  order?: InputMaybe<Array<StripePaymentMethodSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<StripePaymentMethodFilterInput>;
};

export type ListResponseBaseOfStripePaymentMethodResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<StripePaymentMethodSortInput>>;
  where?: InputMaybe<StripePaymentMethodFilterInput>;
};

export type ListResponseBaseOfTip = {
  __typename?: 'ListResponseBaseOfTip';
  result?: Maybe<TipCollectionSegment>;
  result2?: Maybe<TipConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfTipResultArgs = {
  order?: InputMaybe<Array<TipSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TipFilterInput>;
};

export type ListResponseBaseOfTipResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<TipSortInput>>;
  where?: InputMaybe<TipFilterInput>;
};

export type ListResponseBaseOfUser = {
  __typename?: 'ListResponseBaseOfUser';
  result?: Maybe<UserCollectionSegment>;
  result2?: Maybe<UserConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfUserResultArgs = {
  order?: InputMaybe<Array<UserSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserFilterInput>;
};

export type ListResponseBaseOfUserResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<UserSortInput>>;
  where?: InputMaybe<UserFilterInput>;
};

export type ListResponseBaseOfUserDto = {
  __typename?: 'ListResponseBaseOfUserDto';
  result?: Maybe<UserDtoCollectionSegment>;
  result2?: Maybe<UserDtoConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfUserDtoResultArgs = {
  order?: InputMaybe<Array<UserDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserDtoFilterInput>;
};

export type ListResponseBaseOfUserDtoResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<UserDtoSortInput>>;
  where?: InputMaybe<UserDtoFilterInput>;
};

export type ListResponseBaseOfUserPhotoGallery = {
  __typename?: 'ListResponseBaseOfUserPhotoGallery';
  result?: Maybe<UserPhotoGalleryCollectionSegment>;
  result2?: Maybe<UserPhotoGalleryConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfUserPhotoGalleryResultArgs = {
  order?: InputMaybe<Array<UserPhotoGallerySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserPhotoGalleryFilterInput>;
};

export type ListResponseBaseOfUserPhotoGalleryResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<UserPhotoGallerySortInput>>;
  where?: InputMaybe<UserPhotoGalleryFilterInput>;
};

export type ListResponseBaseOfViolationReport = {
  __typename?: 'ListResponseBaseOfViolationReport';
  result?: Maybe<ViolationReportCollectionSegment>;
  result2?: Maybe<ViolationReportConnection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfViolationReportResultArgs = {
  order?: InputMaybe<Array<ViolationReportSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ViolationReportFilterInput>;
};

export type ListResponseBaseOfViolationReportResult2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ViolationReportSortInput>>;
  where?: InputMaybe<ViolationReportFilterInput>;
};

export type ListStringOperationFilterInput = {
  all?: InputMaybe<StringOperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<StringOperationFilterInput>;
  some?: InputMaybe<StringOperationFilterInput>;
};

export type Live = {
  __typename?: 'Live';
  agoraUserId?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  channelRecords?: Maybe<Array<Maybe<ChannelRecord>>>;
  commentCount: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  funding: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  introUrl?: Maybe<Scalars['String']['output']>;
  isBlocked: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isDraft: Scalars['Boolean']['output'];
  isFree: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  likeCount: Scalars['Int']['output'];
  liveType: LiveType;
  photoUrl?: Maybe<Scalars['String']['output']>;
  previewUrl?: Maybe<Scalars['String']['output']>;
  price: Scalars['Decimal']['output'];
  proposalCategory?: Maybe<Scalars['String']['output']>;
  proposalSummary?: Maybe<Scalars['String']['output']>;
  proposalTitle?: Maybe<Scalars['String']['output']>;
  publishingScheduleDate?: Maybe<Scalars['DateTime']['output']>;
  publishingScheduleTime?: Maybe<Scalars['TimeSpan']['output']>;
  purchaseCount: Scalars['Int']['output'];
  rateAverage: Scalars['Float']['output'];
  recordUrl?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<Maybe<LiveRole>>>;
  screenshotUrl?: Maybe<Scalars['String']['output']>;
  setSchedule: Scalars['Boolean']['output'];
  shareCount: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userCount: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
  value: Scalars['Decimal']['output'];
  viewCount: Scalars['Int']['output'];
};

export type LiveComment = {
  __typename?: 'LiveComment';
  children?: Maybe<Array<Maybe<LiveComment>>>;
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  live?: Maybe<Live>;
  liveId: Scalars['Int']['output'];
  parent?: Maybe<LiveComment>;
  parentId?: Maybe<Scalars['Int']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type LiveCommentDto = {
  __typename?: 'LiveCommentDto';
  comment?: Maybe<LiveComment>;
  tip: Scalars['Decimal']['output'];
};

/** A segment of a collection. */
export type LiveCommentDtoCollectionSegment = {
  __typename?: 'LiveCommentDtoCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<LiveCommentDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type LiveCommentDtoConnection = {
  __typename?: 'LiveCommentDtoConnection';
  /** A list of edges. */
  edges?: Maybe<Array<LiveCommentDtoEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<LiveCommentDto>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type LiveCommentDtoEdge = {
  __typename?: 'LiveCommentDtoEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<LiveCommentDto>;
};

export type LiveCommentDtoFilterInput = {
  and?: InputMaybe<Array<LiveCommentDtoFilterInput>>;
  comment?: InputMaybe<LiveCommentFilterInput>;
  or?: InputMaybe<Array<LiveCommentDtoFilterInput>>;
  tip?: InputMaybe<DecimalOperationFilterInput>;
};

export type LiveCommentDtoSortInput = {
  comment?: InputMaybe<LiveCommentSortInput>;
  tip?: InputMaybe<SortEnumType>;
};

export type LiveCommentFilterInput = {
  and?: InputMaybe<Array<LiveCommentFilterInput>>;
  children?: InputMaybe<ListFilterInputTypeOfLiveCommentFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  live?: InputMaybe<LiveFilterInput>;
  liveId?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<LiveCommentFilterInput>>;
  parent?: InputMaybe<LiveCommentFilterInput>;
  parentId?: InputMaybe<IntOperationFilterInput>;
  text?: InputMaybe<StringOperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<IntOperationFilterInput>;
};

export type LiveCommentInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  liveId?: InputMaybe<Scalars['Int']['input']>;
  parentId?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type LiveCommentSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  live?: InputMaybe<LiveSortInput>;
  liveId?: InputMaybe<SortEnumType>;
  parent?: InputMaybe<LiveCommentSortInput>;
  parentId?: InputMaybe<SortEnumType>;
  text?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type LiveDto = {
  __typename?: 'LiveDto';
  isBookmark: Scalars['Boolean']['output'];
  isFollowed: Scalars['Boolean']['output'];
  isLiked: Scalars['Boolean']['output'];
  isPurchased: Scalars['Boolean']['output'];
  isViewed: Scalars['Boolean']['output'];
  live?: Maybe<Live>;
  recordEnded: Scalars['Boolean']['output'];
  recordStarted: Scalars['Boolean']['output'];
};

/** A segment of a collection. */
export type LiveDtoCollectionSegment = {
  __typename?: 'LiveDtoCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<LiveDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type LiveDtoConnection = {
  __typename?: 'LiveDtoConnection';
  /** A list of edges. */
  edges?: Maybe<Array<LiveDtoEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<LiveDto>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type LiveDtoEdge = {
  __typename?: 'LiveDtoEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<LiveDto>;
};

export type LiveDtoFilterInput = {
  and?: InputMaybe<Array<LiveDtoFilterInput>>;
  isBookmark?: InputMaybe<BooleanOperationFilterInput>;
  isFollowed?: InputMaybe<BooleanOperationFilterInput>;
  isLiked?: InputMaybe<BooleanOperationFilterInput>;
  isPurchased?: InputMaybe<BooleanOperationFilterInput>;
  isViewed?: InputMaybe<BooleanOperationFilterInput>;
  live?: InputMaybe<LiveFilterInput>;
  or?: InputMaybe<Array<LiveDtoFilterInput>>;
  recordEnded?: InputMaybe<BooleanOperationFilterInput>;
  recordStarted?: InputMaybe<BooleanOperationFilterInput>;
};

export type LiveDtoSortInput = {
  isBookmark?: InputMaybe<SortEnumType>;
  isFollowed?: InputMaybe<SortEnumType>;
  isLiked?: InputMaybe<SortEnumType>;
  isPurchased?: InputMaybe<SortEnumType>;
  isViewed?: InputMaybe<SortEnumType>;
  live?: InputMaybe<LiveSortInput>;
  recordEnded?: InputMaybe<SortEnumType>;
  recordStarted?: InputMaybe<SortEnumType>;
};

export type LiveFilterInput = {
  agoraUserId?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<LiveFilterInput>>;
  category?: InputMaybe<StringOperationFilterInput>;
  channelRecords?: InputMaybe<ListFilterInputTypeOfChannelRecordFilterInput>;
  commentCount?: InputMaybe<IntOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  funding?: InputMaybe<IntOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  introUrl?: InputMaybe<StringOperationFilterInput>;
  isBlocked?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isDraft?: InputMaybe<BooleanOperationFilterInput>;
  isFree?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  likeCount?: InputMaybe<IntOperationFilterInput>;
  liveType?: InputMaybe<LiveTypeOperationFilterInput>;
  or?: InputMaybe<Array<LiveFilterInput>>;
  photoUrl?: InputMaybe<StringOperationFilterInput>;
  previewUrl?: InputMaybe<StringOperationFilterInput>;
  price?: InputMaybe<DecimalOperationFilterInput>;
  proposalCategory?: InputMaybe<StringOperationFilterInput>;
  proposalSummary?: InputMaybe<StringOperationFilterInput>;
  proposalTitle?: InputMaybe<StringOperationFilterInput>;
  publishingScheduleDate?: InputMaybe<DateTimeOperationFilterInput>;
  publishingScheduleTime?: InputMaybe<TimeSpanOperationFilterInput>;
  purchaseCount?: InputMaybe<IntOperationFilterInput>;
  rateAverage?: InputMaybe<FloatOperationFilterInput>;
  recordUrl?: InputMaybe<StringOperationFilterInput>;
  roles?: InputMaybe<ListFilterInputTypeOfLiveRoleFilterInput>;
  screenshotUrl?: InputMaybe<StringOperationFilterInput>;
  setSchedule?: InputMaybe<BooleanOperationFilterInput>;
  shareCount?: InputMaybe<IntOperationFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userCount?: InputMaybe<IntOperationFilterInput>;
  userId?: InputMaybe<IntOperationFilterInput>;
  value?: InputMaybe<DecimalOperationFilterInput>;
  viewCount?: InputMaybe<IntOperationFilterInput>;
};

export type LiveInput = {
  agoraUserId?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  funding?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  isBlocked?: InputMaybe<Scalars['Int']['input']>;
  isDraft?: InputMaybe<Scalars['Boolean']['input']>;
  isFree?: InputMaybe<Scalars['Boolean']['input']>;
  liveType?: InputMaybe<LiveType>;
  photoUrl?: InputMaybe<Scalars['String']['input']>;
  previewUrl?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Decimal']['input']>;
  proposalCategory?: InputMaybe<Scalars['String']['input']>;
  proposalSummary?: InputMaybe<Scalars['String']['input']>;
  proposalTitle?: InputMaybe<Scalars['String']['input']>;
  publishingScheduleDate?: InputMaybe<Scalars['DateTime']['input']>;
  publishingScheduleTime?: InputMaybe<Scalars['TimeSpan']['input']>;
  roleList?: InputMaybe<Array<InputMaybe<LiveRoleInput>>>;
  setSchedule?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['Decimal']['input']>;
};

export type LiveRateInput = {
  liveId: Scalars['Int']['input'];
  rate: Scalars['Float']['input'];
};

export type LiveRole = {
  __typename?: 'LiveRole';
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  live?: Maybe<Live>;
  liveId: Scalars['Int']['output'];
  present: Scalars['Int']['output'];
  roleName?: Maybe<Scalars['String']['output']>;
};

export type LiveRoleFilterInput = {
  and?: InputMaybe<Array<LiveRoleFilterInput>>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  live?: InputMaybe<LiveFilterInput>;
  liveId?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<LiveRoleFilterInput>>;
  present?: InputMaybe<IntOperationFilterInput>;
  roleName?: InputMaybe<StringOperationFilterInput>;
};

export type LiveRoleInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  present: Scalars['Int']['input'];
  roleName?: InputMaybe<Scalars['String']['input']>;
};

export type LiveSortInput = {
  agoraUserId?: InputMaybe<SortEnumType>;
  category?: InputMaybe<SortEnumType>;
  commentCount?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  funding?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  introUrl?: InputMaybe<SortEnumType>;
  isBlocked?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isDraft?: InputMaybe<SortEnumType>;
  isFree?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  likeCount?: InputMaybe<SortEnumType>;
  liveType?: InputMaybe<SortEnumType>;
  photoUrl?: InputMaybe<SortEnumType>;
  previewUrl?: InputMaybe<SortEnumType>;
  price?: InputMaybe<SortEnumType>;
  proposalCategory?: InputMaybe<SortEnumType>;
  proposalSummary?: InputMaybe<SortEnumType>;
  proposalTitle?: InputMaybe<SortEnumType>;
  publishingScheduleDate?: InputMaybe<SortEnumType>;
  publishingScheduleTime?: InputMaybe<SortEnumType>;
  purchaseCount?: InputMaybe<SortEnumType>;
  rateAverage?: InputMaybe<SortEnumType>;
  recordUrl?: InputMaybe<SortEnumType>;
  screenshotUrl?: InputMaybe<SortEnumType>;
  setSchedule?: InputMaybe<SortEnumType>;
  shareCount?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userCount?: InputMaybe<SortEnumType>;
  userId?: InputMaybe<SortEnumType>;
  value?: InputMaybe<SortEnumType>;
  viewCount?: InputMaybe<SortEnumType>;
};

export enum LiveType {
  Collaboration = 'COLLABORATION',
  General = 'GENERAL',
  Investment = 'INVESTMENT',
  LiveContent = 'LIVE_CONTENT',
  Promotion = 'PROMOTION',
}

export type LiveTypeOperationFilterInput = {
  eq?: InputMaybe<LiveType>;
  in?: InputMaybe<Array<LiveType>>;
  neq?: InputMaybe<LiveType>;
  nin?: InputMaybe<Array<LiveType>>;
};

export type LoginActivity = {
  __typename?: 'LoginActivity';
  createdDate: Scalars['DateTime']['output'];
  deviceInfo?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastLogin: Scalars['DateTime']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  logout: Scalars['Boolean']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type LoginActivityCollectionSegment = {
  __typename?: 'LoginActivityCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<LoginActivity>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type LoginActivityConnection = {
  __typename?: 'LoginActivityConnection';
  /** A list of edges. */
  edges?: Maybe<Array<LoginActivityEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<LoginActivity>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type LoginActivityEdge = {
  __typename?: 'LoginActivityEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<LoginActivity>;
};

export type LoginActivityFilterInput = {
  and?: InputMaybe<Array<LoginActivityFilterInput>>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  deviceInfo?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastLogin?: InputMaybe<DateTimeOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  logout?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<LoginActivityFilterInput>>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<IntOperationFilterInput>;
};

export type LoginActivityInput = {
  deviceInfo?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  lastLogin?: InputMaybe<Scalars['DateTime']['input']>;
  logout?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LoginActivitySortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  deviceInfo?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastLogin?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  logout?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type LongOperationFilterInput = {
  eq?: InputMaybe<Scalars['Long']['input']>;
  gt?: InputMaybe<Scalars['Long']['input']>;
  gte?: InputMaybe<Scalars['Long']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  lt?: InputMaybe<Scalars['Long']['input']>;
  lte?: InputMaybe<Scalars['Long']['input']>;
  neq?: InputMaybe<Scalars['Long']['input']>;
  ngt?: InputMaybe<Scalars['Long']['input']>;
  ngte?: InputMaybe<Scalars['Long']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  nlt?: InputMaybe<Scalars['Long']['input']>;
  nlte?: InputMaybe<Scalars['Long']['input']>;
};

export enum MediaType {
  Audio = 'AUDIO',
  Contact = 'CONTACT',
  Document = 'DOCUMENT',
  Image = 'IMAGE',
  Location = 'LOCATION',
  None = 'NONE',
  ReplyStory = 'REPLY_STORY',
  Report = 'REPORT',
  SharedEvent = 'SHARED_EVENT',
  SharedPost = 'SHARED_POST',
  SharedProduct = 'SHARED_PRODUCT',
  SharedStory = 'SHARED_STORY',
  Ticket = 'TICKET',
  Video = 'VIDEO',
}

export type MediaTypeOperationFilterInput = {
  eq?: InputMaybe<MediaType>;
  in?: InputMaybe<Array<MediaType>>;
  neq?: InputMaybe<MediaType>;
  nin?: InputMaybe<Array<MediaType>>;
};

export type Message = {
  __typename?: 'Message';
  conversation?: Maybe<Conversation>;
  conversationId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdDate: Scalars['DateTime']['output'];
  groupId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isEdited: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  mediaEntityId?: Maybe<Scalars['Int']['output']>;
  mediaType: MediaType;
  mediaUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Message>;
  parentId?: Maybe<Scalars['Int']['output']>;
  sender?: Maybe<User>;
  senderId: Scalars['Int']['output'];
  text?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type MessageCollectionSegment = {
  __typename?: 'MessageCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Message>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type MessageConnection = {
  __typename?: 'MessageConnection';
  /** A list of edges. */
  edges?: Maybe<Array<MessageEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<Message>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type MessageEdge = {
  __typename?: 'MessageEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Message>;
};

export type MessageFilterInput = {
  and?: InputMaybe<Array<MessageFilterInput>>;
  conversation?: InputMaybe<ConversationFilterInput>;
  conversationId?: InputMaybe<IntOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  groupId?: InputMaybe<IntOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isEdited?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  mediaEntityId?: InputMaybe<IntOperationFilterInput>;
  mediaType?: InputMaybe<MediaTypeOperationFilterInput>;
  mediaUrl?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<MessageFilterInput>>;
  parent?: InputMaybe<MessageFilterInput>;
  parentId?: InputMaybe<IntOperationFilterInput>;
  sender?: InputMaybe<UserFilterInput>;
  senderId?: InputMaybe<IntOperationFilterInput>;
  text?: InputMaybe<StringOperationFilterInput>;
};

export type MessageInput = {
  conversationId?: InputMaybe<Scalars['Int']['input']>;
  mediaEntityId?: InputMaybe<Scalars['Int']['input']>;
  mediaType: MediaType;
  mediaUrl?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type MessageSortInput = {
  conversation?: InputMaybe<ConversationSortInput>;
  conversationId?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  groupId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isEdited?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  mediaEntityId?: InputMaybe<SortEnumType>;
  mediaType?: InputMaybe<SortEnumType>;
  mediaUrl?: InputMaybe<SortEnumType>;
  parent?: InputMaybe<MessageSortInput>;
  parentId?: InputMaybe<SortEnumType>;
  sender?: InputMaybe<UserSortInput>;
  senderId?: InputMaybe<SortEnumType>;
  text?: InputMaybe<SortEnumType>;
};

export type MessageSummaryDto = {
  __typename?: 'MessageSummaryDto';
  directConversationCount: Scalars['Int']['output'];
  groupConversationCount: Scalars['Int']['output'];
  messageCount: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  agora_createToken?: Maybe<ResponseBaseOfString>;
  agora_stopRecord?: Maybe<ResponseStatus>;
  blockUser_block?: Maybe<ResponseBaseOfBlockUser>;
  blockUser_unblock?: Maybe<ResponseStatus>;
  category_createCategory: ResponseBaseOfCategory;
  category_deleteCategory: ResponseStatus;
  category_updateCategory: ResponseBaseOfCategory;
  community_acceptRequest?: Maybe<ResponseStatus>;
  community_createCommunity?: Maybe<ResponseBaseOfCommunity>;
  community_createMessage?: Maybe<ResponseBaseOfCommunityMessage>;
  community_createRequest?: Maybe<ResponseBaseOfCommunityRequest>;
  community_deleteCommunity?: Maybe<ResponseStatus>;
  community_deleteMessage?: Maybe<ResponseStatus>;
  community_joinCommunity?: Maybe<ResponseBaseOfCommunityUser>;
  community_leaveCommunity?: Maybe<ResponseBaseOfCommunityUser>;
  community_rejectRequest?: Maybe<ResponseStatus>;
  community_updateCommunity?: Maybe<ResponseBaseOfCommunity>;
  community_updateCommunityUser?: Maybe<ResponseBaseOfCommunityUser>;
  contactUs_setContactUs?: Maybe<ResponseBaseOfContactUs>;
  create: ResponseBaseOfViolationReport;
  defaultViolation_createDefaultViolation: ResponseBaseOfDefaultViolation;
  defaultViolation_deleteDefaultViolation: ResponseBaseOfDefaultViolation;
  defaultViolation_updateDefaultViolation: ResponseBaseOfDefaultViolation;
  delete: ResponseStatus;
  email_sendEmail: ResponseBaseOfSentEmail;
  email_sendEmailWithAWS: ResponseBaseOfSentEmail;
  live_addToBookmark?: Maybe<ResponseStatus>;
  live_createComment?: Maybe<ResponseBaseOfLiveComment>;
  live_createLive?: Maybe<ResponseBaseOfLive>;
  live_createNotInterested?: Maybe<ResponseStatus>;
  live_deleteComment?: Maybe<ResponseStatus>;
  live_deleteLive?: Maybe<ResponseStatus>;
  live_like?: Maybe<ResponseStatus>;
  live_purchase?: Maybe<ResponseStatus>;
  live_rate?: Maybe<ResponseStatus>;
  live_removeFromBookmark?: Maybe<ResponseStatus>;
  live_updateLive?: Maybe<ResponseBaseOfLive>;
  live_viewLive?: Maybe<ResponseStatus>;
  message_addUserToGroup?: Maybe<ResponseStatus>;
  message_createContact?: Maybe<ResponseBaseOfContact>;
  message_createConversationGroup?: Maybe<ResponseBaseOfConversation>;
  message_createDirectMessage?: Maybe<ResponseBaseOfMessage>;
  message_createGroupMessage?: Maybe<ResponseBaseOfMessage>;
  message_removeContact?: Maybe<ResponseBaseOfContact>;
  message_removeConversation?: Maybe<ResponseStatus>;
  message_removeMessage?: Maybe<ResponseStatus>;
  message_removeMessages?: Maybe<ResponseStatus>;
  message_removeUserFromGroup?: Maybe<ResponseStatus>;
  message_updateMessage?: Maybe<ResponseBaseOfMessage>;
  notification_createNotification?: Maybe<ResponseStatus>;
  notification_disableNotificationFromUser?: Maybe<ResponseBaseOfDisabledNotificationFromUser>;
  notification_enableNotificationFromUser?: Maybe<ResponseBaseOfDisabledNotificationFromUser>;
  notification_setRead?: Maybe<ResponseBaseOfNotification>;
  notification_updateNotificationSettings?: Maybe<ResponseBaseOfNotification>;
  paymentStripe_createCharge?: Maybe<ResponseBaseOfChargeDto>;
  paymentStripe_createChargeByToken?: Maybe<ResponseBaseOfChargeDto>;
  paymentStripe_createCheckoutSessionAsync?: Maybe<ResponseBaseOfString>;
  paymentStripe_createCustomer?: Maybe<ResponseBaseOfCustomerDto>;
  paymentStripe_createPaymentMethod?: Maybe<ResponseStatus>;
  paymentStripe_deletePaymentMethod?: Maybe<ResponseStatus>;
  paymentStripe_getMoneyFromConnectAccoun?: Maybe<ResponseBaseOfChargeDto>;
  paymentStripe_onboardUserInStripeConnect?: Maybe<ResponseBaseOfOnboardStripeConnectDto>;
  paymentStripe_payWithIntent?: Maybe<ResponseBaseOfPayWithIntentDto>;
  paymentStripe_payWithStripePage?: Maybe<ResponseBaseOfStringDto>;
  paymentStripe_payment?: Maybe<ResponseBaseOfChargeDto>;
  paymentStripe_subscribeToPlan?: Maybe<ResponseStatus>;
  paymentStripe_transferMoneyToAccount?: Maybe<ResponseBaseOfTransferDto>;
  paymentStripe_updatePaymentMethod?: Maybe<ResponseStatus>;
  social_acceptFollow?: Maybe<ResponseBase>;
  social_followUser?: Maybe<ResponseBaseOfFollower>;
  social_hideStory?: Maybe<ResponseStatus>;
  social_removeFollower?: Maybe<ResponseBase>;
  social_removeFollowerAndFollowee?: Maybe<ResponseStatus>;
  social_unfollow?: Maybe<ResponseBase>;
  social_unhideStory?: Maybe<ResponseStatus>;
  tip_createTip?: Maybe<ResponseBaseOfTip>;
  update?: Maybe<ResponseBaseOfViolationReport>;
  user_addPhoto?: Maybe<ResponseBaseOfUserPhotoGallery>;
  user_addPhotos?: Maybe<ListResponseBaseOfUserPhotoGallery>;
  user_changeUserPassowrd?: Maybe<ResponseStatus>;
  user_checkVerificationCodeOfEmail?: Maybe<ResponseBaseOfUserTokenDtoOfUser>;
  user_confirmPhoneNumber?: Maybe<ResponseStatus>;
  user_createInvite?: Maybe<ResponseBaseOfInvite>;
  user_createLoginActivity?: Maybe<ResponseBaseOfLoginActivity>;
  user_createRequestForVerification?: Maybe<ResponseBaseOfRequestForVerification>;
  user_createWalletHistory?: Maybe<ResponseBaseOfWalletHistory>;
  user_deleteLoginActivity?: Maybe<ResponseStatus>;
  user_generateTokenViaEmail?: Maybe<ResponseBaseOfUserTokenDtoOfUser>;
  user_generateTwoFactorAuthenticationCode?: Maybe<ResponseBaseOfUser>;
  user_refreshToken?: Maybe<ResponseBaseOfUserTokenDtoOfUser>;
  user_removePhoto?: Maybe<ResponseStatus>;
  user_removePhotos?: Maybe<ResponseStatus>;
  user_removeUser?: Maybe<ResponseStatus>;
  user_resetPasswordUsingEmail?: Maybe<ResponseStatus>;
  user_sendVerificationCodeToEmail?: Maybe<ResponseStatus>;
  user_sendVerificationCodeToPhoneNumber?: Maybe<ResponseStatus>;
  user_setPhotos?: Maybe<ListResponseBaseOfUserPhotoGallery>;
  user_signIn?: Maybe<ResponseBaseOfUserTokenDtoOfUser>;
  user_signInExternal?: Maybe<ResponseBaseOfUserTokenDtoOfUser>;
  user_signInUsingPhoneNumber?: Maybe<ResponseBaseOfUserTokenDtoOfUser>;
  user_signUp?: Maybe<ResponseBaseOfUser>;
  user_signUpExternal?: Maybe<ResponseBaseOfUserTokenDtoOfUser>;
  user_updateLoginActivity?: Maybe<ResponseBaseOfLoginActivity>;
  user_updateRequestForVerification?: Maybe<ResponseBaseOfRequestForVerification>;
  user_updateUser?: Maybe<ResponseBaseOfUser>;
  violationReport_createViolationReport: ResponseBaseOfViolationReport;
  violationReport_deleteViolationReport: ResponseStatus;
  violationReport_updateViolationReport?: Maybe<ResponseBaseOfViolationReport>;
};

export type MutationAgora_CreateTokenArgs = {
  channelName?: InputMaybe<Scalars['String']['input']>;
  publisher: Scalars['Boolean']['input'];
};

export type MutationAgora_StopRecordArgs = {
  channelName?: InputMaybe<Scalars['String']['input']>;
};

export type MutationBlockUser_BlockArgs = {
  input?: InputMaybe<BlockUserInput>;
};

export type MutationBlockUser_UnblockArgs = {
  input?: InputMaybe<BlockUserInput>;
};

export type MutationCategory_CreateCategoryArgs = {
  input: CategoryInput;
};

export type MutationCategory_DeleteCategoryArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationCategory_UpdateCategoryArgs = {
  input: CategoryInput;
};

export type MutationCommunity_AcceptRequestArgs = {
  requestId: Scalars['Int']['input'];
};

export type MutationCommunity_CreateCommunityArgs = {
  input?: InputMaybe<CommunityInput>;
};

export type MutationCommunity_CreateMessageArgs = {
  input?: InputMaybe<CommunityMessageInput>;
};

export type MutationCommunity_CreateRequestArgs = {
  communityId: Scalars['Int']['input'];
};

export type MutationCommunity_DeleteCommunityArgs = {
  communityId: Scalars['Int']['input'];
};

export type MutationCommunity_DeleteMessageArgs = {
  messageId: Scalars['Int']['input'];
};

export type MutationCommunity_JoinCommunityArgs = {
  communityId: Scalars['Int']['input'];
};

export type MutationCommunity_LeaveCommunityArgs = {
  communityId: Scalars['Int']['input'];
};

export type MutationCommunity_RejectRequestArgs = {
  requestId: Scalars['Int']['input'];
};

export type MutationCommunity_UpdateCommunityArgs = {
  input?: InputMaybe<CommunityInput>;
};

export type MutationCommunity_UpdateCommunityUserArgs = {
  input?: InputMaybe<CommunityUserInput>;
};

export type MutationContactUs_SetContactUsArgs = {
  input?: InputMaybe<ContactUsInput>;
};

export type MutationCreateArgs = {
  input: ViolationReportInput;
};

export type MutationDefaultViolation_CreateDefaultViolationArgs = {
  input: DefaultViolationInput;
};

export type MutationDefaultViolation_DeleteDefaultViolationArgs = {
  defaultViolationId: Scalars['Int']['input'];
};

export type MutationDefaultViolation_UpdateDefaultViolationArgs = {
  input: DefaultViolationInput;
};

export type MutationDeleteArgs = {
  violationReportId: Scalars['Int']['input'];
};

export type MutationEmail_SendEmailArgs = {
  emailInput: EmailInput;
};

export type MutationEmail_SendEmailWithAwsArgs = {
  emailInput: EmailInput;
};

export type MutationLive_AddToBookmarkArgs = {
  liveId: Scalars['Int']['input'];
};

export type MutationLive_CreateCommentArgs = {
  input?: InputMaybe<LiveCommentInput>;
};

export type MutationLive_CreateLiveArgs = {
  input?: InputMaybe<LiveInput>;
};

export type MutationLive_CreateNotInterestedArgs = {
  liveId: Scalars['Int']['input'];
};

export type MutationLive_DeleteCommentArgs = {
  commentId: Scalars['Int']['input'];
};

export type MutationLive_DeleteLiveArgs = {
  liveId: Scalars['Int']['input'];
};

export type MutationLive_LikeArgs = {
  liveId: Scalars['Int']['input'];
};

export type MutationLive_PurchaseArgs = {
  liveId: Scalars['Int']['input'];
};

export type MutationLive_RateArgs = {
  input?: InputMaybe<LiveRateInput>;
};

export type MutationLive_RemoveFromBookmarkArgs = {
  liveId: Scalars['Int']['input'];
};

export type MutationLive_UpdateLiveArgs = {
  input?: InputMaybe<LiveInput>;
};

export type MutationLive_ViewLiveArgs = {
  liveId: Scalars['Int']['input'];
};

export type MutationMessage_AddUserToGroupArgs = {
  conversationId: Scalars['Int']['input'];
  userIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type MutationMessage_CreateContactArgs = {
  input?: InputMaybe<ContactInput>;
};

export type MutationMessage_CreateConversationGroupArgs = {
  input?: InputMaybe<UserGroupInput>;
  userIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type MutationMessage_CreateDirectMessageArgs = {
  input?: InputMaybe<MessageInput>;
  receiverId: Scalars['Int']['input'];
};

export type MutationMessage_CreateGroupMessageArgs = {
  messageInput?: InputMaybe<MessageInput>;
};

export type MutationMessage_RemoveContactArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationMessage_RemoveConversationArgs = {
  conversationId: Scalars['Int']['input'];
};

export type MutationMessage_RemoveMessageArgs = {
  messageId: Scalars['Int']['input'];
};

export type MutationMessage_RemoveMessagesArgs = {
  messageIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type MutationMessage_RemoveUserFromGroupArgs = {
  conversationId: Scalars['Int']['input'];
};

export type MutationMessage_UpdateMessageArgs = {
  messageId: Scalars['Int']['input'];
  text?: InputMaybe<Scalars['String']['input']>;
};

export type MutationNotification_CreateNotificationArgs = {
  input?: InputMaybe<Array<InputMaybe<NotificationInput>>>;
};

export type MutationNotification_DisableNotificationFromUserArgs = {
  targetUserId: Scalars['Int']['input'];
};

export type MutationNotification_EnableNotificationFromUserArgs = {
  targetUserId: Scalars['Int']['input'];
};

export type MutationNotification_SetReadArgs = {
  notificationId: Scalars['Int']['input'];
};

export type MutationNotification_UpdateNotificationSettingsArgs = {
  input?: InputMaybe<Array<InputMaybe<NotificationSettingsInput>>>;
};

export type MutationPaymentStripe_CreateChargeArgs = {
  customerInput?: InputMaybe<PaymentCustomerInput>;
  paymentInput?: InputMaybe<StripFullPaymentInput>;
  userStripeAccountId?: InputMaybe<Scalars['String']['input']>;
};

export type MutationPaymentStripe_CreateChargeByTokenArgs = {
  input?: InputMaybe<StripPaymentInput>;
};

export type MutationPaymentStripe_CreateCheckoutSessionAsyncArgs = {
  baseUrl?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['String']['input']>;
  priceId?: InputMaybe<Scalars['String']['input']>;
};

export type MutationPaymentStripe_CreateCustomerArgs = {
  customerInput?: InputMaybe<PaymentCustomerInput>;
};

export type MutationPaymentStripe_CreatePaymentMethodArgs = {
  input?: InputMaybe<PaymentMethodInput>;
};

export type MutationPaymentStripe_DeletePaymentMethodArgs = {
  paymentMethodId?: InputMaybe<Scalars['String']['input']>;
};

export type MutationPaymentStripe_GetMoneyFromConnectAccounArgs = {
  cost: Scalars['Float']['input'];
  currency?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Array<KeyValuePairOfStringAndStringInput>>;
  userStripeAccountId?: InputMaybe<Scalars['String']['input']>;
};

export type MutationPaymentStripe_OnboardUserInStripeConnectArgs = {
  refreshUrl?: InputMaybe<Scalars['String']['input']>;
  returnUrl?: InputMaybe<Scalars['String']['input']>;
};

export type MutationPaymentStripe_PayWithIntentArgs = {
  amount: Scalars['Decimal']['input'];
  amountForApsy?: InputMaybe<Scalars['Decimal']['input']>;
};

export type MutationPaymentStripe_PayWithStripePageArgs = {
  amount: Scalars['Decimal']['input'];
  cancelUrl?: InputMaybe<Scalars['String']['input']>;
  successUrl?: InputMaybe<Scalars['String']['input']>;
};

export type MutationPaymentStripe_PaymentArgs = {
  input?: InputMaybe<StripePaymentInput>;
};

export type MutationPaymentStripe_SubscribeToPlanArgs = {
  customerId?: InputMaybe<Scalars['String']['input']>;
  planId?: InputMaybe<Scalars['String']['input']>;
};

export type MutationPaymentStripe_TransferMoneyToAccountArgs = {
  cost: Scalars['Float']['input'];
  currency?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Array<KeyValuePairOfStringAndStringInput>>;
  transferGroup?: InputMaybe<Scalars['String']['input']>;
  userStripeAccountId?: InputMaybe<Scalars['String']['input']>;
};

export type MutationPaymentStripe_UpdatePaymentMethodArgs = {
  input?: InputMaybe<PaymentMethodInput>;
};

export type MutationSocial_AcceptFollowArgs = {
  followerId: Scalars['Int']['input'];
};

export type MutationSocial_FollowUserArgs = {
  input?: InputMaybe<FollowerInput>;
};

export type MutationSocial_HideStoryArgs = {
  followerId: Scalars['Int']['input'];
};

export type MutationSocial_RemoveFollowerArgs = {
  followerId: Scalars['Int']['input'];
};

export type MutationSocial_RemoveFollowerAndFolloweeArgs = {
  targetUserId: Scalars['Int']['input'];
};

export type MutationSocial_UnfollowArgs = {
  input?: InputMaybe<FollowerInput>;
};

export type MutationSocial_UnhideStoryArgs = {
  targetUserId: Scalars['Int']['input'];
};

export type MutationTip_CreateTipArgs = {
  input?: InputMaybe<TipInput>;
};

export type MutationUpdateArgs = {
  input?: InputMaybe<ViolationReportInput>;
};

export type MutationUser_AddPhotoArgs = {
  photo?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUser_AddPhotosArgs = {
  input?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type MutationUser_ChangeUserPassowrdArgs = {
  input?: InputMaybe<ChangePassowrdInput>;
};

export type MutationUser_CheckVerificationCodeOfEmailArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  isForResetPassword: Scalars['Boolean']['input'];
  verificationCode?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUser_ConfirmPhoneNumberArgs = {
  input?: InputMaybe<ConfirmPhoneNumberInput>;
};

export type MutationUser_CreateInviteArgs = {
  link?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUser_CreateLoginActivityArgs = {
  input?: InputMaybe<LoginActivityInput>;
};

export type MutationUser_CreateWalletHistoryArgs = {
  input?: InputMaybe<WalletHistoryInput>;
};

export type MutationUser_DeleteLoginActivityArgs = {
  loginActivityId: Scalars['Int']['input'];
};

export type MutationUser_GenerateTokenViaEmailArgs = {
  input?: InputMaybe<ConfirmEmailInput>;
};

export type MutationUser_RefreshTokenArgs = {
  input?: InputMaybe<TokenInput>;
};

export type MutationUser_RemovePhotoArgs = {
  photoGalleryId: Scalars['Int']['input'];
};

export type MutationUser_RemovePhotosArgs = {
  input?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type MutationUser_RemoveUserArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type MutationUser_ResetPasswordUsingEmailArgs = {
  input?: InputMaybe<ResetPasswordUsingEmailInput>;
};

export type MutationUser_SendVerificationCodeToEmailArgs = {
  input?: InputMaybe<SendVerificationCodeToEmailInput>;
};

export type MutationUser_SendVerificationCodeToPhoneNumberArgs = {
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUser_SetPhotosArgs = {
  input?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type MutationUser_SignInArgs = {
  input?: InputMaybe<SigninInput>;
};

export type MutationUser_SignInExternalArgs = {
  input?: InputMaybe<SignInExternalInput>;
};

export type MutationUser_SignInUsingPhoneNumberArgs = {
  input?: InputMaybe<SignInUsingPhoneNumberInput>;
};

export type MutationUser_SignUpArgs = {
  input?: InputMaybe<SignUpInput>;
  userInput?: InputMaybe<UserInput>;
};

export type MutationUser_SignUpExternalArgs = {
  input?: InputMaybe<SignUpExternalInput>;
  userInput?: InputMaybe<UserInput>;
};

export type MutationUser_UpdateLoginActivityArgs = {
  input?: InputMaybe<LoginActivityInput>;
};

export type MutationUser_UpdateRequestForVerificationArgs = {
  input?: InputMaybe<RequestForVerificationInput>;
};

export type MutationUser_UpdateUserArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
  userInput?: InputMaybe<UserInput>;
};

export type MutationViolationReport_CreateViolationReportArgs = {
  input: ViolationReportInput;
};

export type MutationViolationReport_DeleteViolationReportArgs = {
  violationReportId: Scalars['Int']['input'];
};

export type MutationViolationReport_UpdateViolationReportArgs = {
  input?: InputMaybe<ViolationReportInput>;
};

export type Notification = {
  __typename?: 'Notification';
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isRead: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  /**
   * NewFollower,NewMessage,LikeComment,
   *             NewTip,
   *             NewLive,
   *             CreateComment,
   *             Like,
   *             JoinToLive,
   *
   */
  notificationType?: Maybe<Scalars['String']['output']>;
  relatedEntity?: Maybe<Scalars['String']['output']>;
  relatedEntityId?: Maybe<Scalars['Int']['output']>;
  relatedUser?: Maybe<User>;
  relatedUserId?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type NotificationCollectionSegment = {
  __typename?: 'NotificationCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Notification>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type NotificationConnection = {
  __typename?: 'NotificationConnection';
  /** A list of edges. */
  edges?: Maybe<Array<NotificationEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<Notification>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type NotificationEdge = {
  __typename?: 'NotificationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Notification>;
};

export type NotificationFilterInput = {
  and?: InputMaybe<Array<NotificationFilterInput>>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isRead?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  /**
   * NewFollower,NewMessage,LikeComment,
   *             NewTip,
   *             NewLive,
   *             CreateComment,
   *             Like,
   *             JoinToLive,
   *
   */
  notificationType?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<NotificationFilterInput>>;
  relatedEntity?: InputMaybe<StringOperationFilterInput>;
  relatedEntityId?: InputMaybe<IntOperationFilterInput>;
  relatedUser?: InputMaybe<UserFilterInput>;
  relatedUserId?: InputMaybe<IntOperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<IntOperationFilterInput>;
};

export type NotificationInput = {
  notificationType?: InputMaybe<Scalars['String']['input']>;
  relatedEntity?: InputMaybe<Scalars['String']['input']>;
  relatedEntityId?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};

export type NotificationSettings = {
  __typename?: 'NotificationSettings';
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isEnabled: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  notificationType?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type NotificationSettingsCollectionSegment = {
  __typename?: 'NotificationSettingsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<NotificationSettings>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type NotificationSettingsConnection = {
  __typename?: 'NotificationSettingsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<NotificationSettingsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<NotificationSettings>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type NotificationSettingsEdge = {
  __typename?: 'NotificationSettingsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<NotificationSettings>;
};

export type NotificationSettingsFilterInput = {
  and?: InputMaybe<Array<NotificationSettingsFilterInput>>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isEnabled?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  notificationType?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<NotificationSettingsFilterInput>>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<IntOperationFilterInput>;
};

export type NotificationSettingsInput = {
  isEnabled: Scalars['Boolean']['input'];
  notificationType?: InputMaybe<Scalars['String']['input']>;
};

export type NotificationSettingsSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isEnabled?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  notificationType?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type NotificationSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isRead?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  /**
   * NewFollower,NewMessage,LikeComment,
   *             NewTip,
   *             NewLive,
   *             CreateComment,
   *             Like,
   *             JoinToLive,
   *
   */
  notificationType?: InputMaybe<SortEnumType>;
  relatedEntity?: InputMaybe<SortEnumType>;
  relatedEntityId?: InputMaybe<SortEnumType>;
  relatedUser?: InputMaybe<UserSortInput>;
  relatedUserId?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type NullableOfGenderOperationFilterInput = {
  eq?: InputMaybe<Gender>;
  in?: InputMaybe<Array<InputMaybe<Gender>>>;
  neq?: InputMaybe<Gender>;
  nin?: InputMaybe<Array<InputMaybe<Gender>>>;
};

export type NullableOfUserTypeOperationFilterInput = {
  eq?: InputMaybe<UserType>;
  in?: InputMaybe<Array<InputMaybe<UserType>>>;
  neq?: InputMaybe<UserType>;
  nin?: InputMaybe<Array<InputMaybe<UserType>>>;
};

export enum OgcGeometryType {
  CircularString = 'CIRCULAR_STRING',
  CompoundCurve = 'COMPOUND_CURVE',
  Curve = 'CURVE',
  CurvePolygon = 'CURVE_POLYGON',
  GeometryCollection = 'GEOMETRY_COLLECTION',
  LineString = 'LINE_STRING',
  MultiCurve = 'MULTI_CURVE',
  MultiLineString = 'MULTI_LINE_STRING',
  MultiPoint = 'MULTI_POINT',
  MultiPolygon = 'MULTI_POLYGON',
  MultiSurface = 'MULTI_SURFACE',
  Point = 'POINT',
  Polygon = 'POLYGON',
  PolyhedralSurface = 'POLYHEDRAL_SURFACE',
  Surface = 'SURFACE',
  Tin = 'TIN',
}

export type OgcGeometryTypeOperationFilterInput = {
  eq?: InputMaybe<OgcGeometryType>;
  in?: InputMaybe<Array<OgcGeometryType>>;
  neq?: InputMaybe<OgcGeometryType>;
  nin?: InputMaybe<Array<OgcGeometryType>>;
};

export type OnboardStripeConnectDto = {
  __typename?: 'OnboardStripeConnectDto';
  completed: Scalars['Boolean']['output'];
  errors?: Maybe<Array<Maybe<StripeConnectError>>>;
  url?: Maybe<Scalars['String']['output']>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PayWithIntentDto = {
  __typename?: 'PayWithIntentDto';
  apsyClientSecret?: Maybe<Scalars['String']['output']>;
  apsyPublishableKey?: Maybe<Scalars['String']['output']>;
  clientSecret?: Maybe<Scalars['String']['output']>;
  publishableKey?: Maybe<Scalars['String']['output']>;
};

export type PaymentCustomerInput = {
  balance?: InputMaybe<Scalars['Long']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Array<KeyValuePairOfStringAndStringInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type PaymentMethodInput = {
  cardName?: InputMaybe<Scalars['String']['input']>;
  cardNumber?: InputMaybe<Scalars['String']['input']>;
  createForApsy: Scalars['Boolean']['input'];
  cvc?: InputMaybe<Scalars['String']['input']>;
  expMonth?: InputMaybe<Scalars['String']['input']>;
  expYear?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  saveForFuturePurchases: Scalars['Boolean']['input'];
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type PaymentValidationResultDto = {
  __typename?: 'PaymentValidationResultDto';
  environment?: Maybe<Scalars['String']['output']>;
  purchaseDate?: Maybe<Scalars['DateTime']['output']>;
  receiptType?: Maybe<Scalars['String']['output']>;
  status: Scalars['Int']['output'];
};

export type PlanDto = {
  __typename?: 'PlanDto';
  active: Scalars['Boolean']['output'];
  aggregateUsage?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['Long']['output']>;
  amountDecimal?: Maybe<Scalars['Decimal']['output']>;
  billingScheme?: Maybe<Scalars['String']['output']>;
  created: Scalars['DateTime']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  interval?: Maybe<Scalars['String']['output']>;
  intervalCount: Scalars['Long']['output'];
  livemode: Scalars['Boolean']['output'];
  metadata?: Maybe<Array<KeyValuePairOfStringAndString>>;
  nickname?: Maybe<Scalars['String']['output']>;
  object?: Maybe<Scalars['String']['output']>;
  product?: Maybe<PlanProductDto>;
  productId?: Maybe<Scalars['String']['output']>;
  tiersMode?: Maybe<Scalars['String']['output']>;
  trialPeriodDays?: Maybe<Scalars['Long']['output']>;
  usageType?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type PlanDtoCollectionSegment = {
  __typename?: 'PlanDtoCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<PlanDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type PlanDtoConnection = {
  __typename?: 'PlanDtoConnection';
  /** A list of edges. */
  edges?: Maybe<Array<PlanDtoEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<PlanDto>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type PlanDtoEdge = {
  __typename?: 'PlanDtoEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<PlanDto>;
};

export type PlanDtoFilterInput = {
  active?: InputMaybe<BooleanOperationFilterInput>;
  aggregateUsage?: InputMaybe<StringOperationFilterInput>;
  amount?: InputMaybe<LongOperationFilterInput>;
  amountDecimal?: InputMaybe<DecimalOperationFilterInput>;
  and?: InputMaybe<Array<PlanDtoFilterInput>>;
  billingScheme?: InputMaybe<StringOperationFilterInput>;
  created?: InputMaybe<DateTimeOperationFilterInput>;
  currency?: InputMaybe<StringOperationFilterInput>;
  deleted?: InputMaybe<BooleanOperationFilterInput>;
  id?: InputMaybe<StringOperationFilterInput>;
  interval?: InputMaybe<StringOperationFilterInput>;
  intervalCount?: InputMaybe<LongOperationFilterInput>;
  livemode?: InputMaybe<BooleanOperationFilterInput>;
  metadata?: InputMaybe<ListFilterInputTypeOfKeyValuePairOfStringAndStringFilterInput>;
  nickname?: InputMaybe<StringOperationFilterInput>;
  object?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<PlanDtoFilterInput>>;
  product?: InputMaybe<PlanProductDtoFilterInput>;
  productId?: InputMaybe<StringOperationFilterInput>;
  tiersMode?: InputMaybe<StringOperationFilterInput>;
  trialPeriodDays?: InputMaybe<LongOperationFilterInput>;
  usageType?: InputMaybe<StringOperationFilterInput>;
};

export type PlanDtoSortInput = {
  active?: InputMaybe<SortEnumType>;
  aggregateUsage?: InputMaybe<SortEnumType>;
  amount?: InputMaybe<SortEnumType>;
  amountDecimal?: InputMaybe<SortEnumType>;
  billingScheme?: InputMaybe<SortEnumType>;
  created?: InputMaybe<SortEnumType>;
  currency?: InputMaybe<SortEnumType>;
  deleted?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  interval?: InputMaybe<SortEnumType>;
  intervalCount?: InputMaybe<SortEnumType>;
  livemode?: InputMaybe<SortEnumType>;
  nickname?: InputMaybe<SortEnumType>;
  object?: InputMaybe<SortEnumType>;
  product?: InputMaybe<PlanProductDtoSortInput>;
  productId?: InputMaybe<SortEnumType>;
  tiersMode?: InputMaybe<SortEnumType>;
  trialPeriodDays?: InputMaybe<SortEnumType>;
  usageType?: InputMaybe<SortEnumType>;
};

export type PlanProductDto = {
  __typename?: 'PlanProductDto';
  active: Scalars['Boolean']['output'];
  caption?: Maybe<Scalars['String']['output']>;
  created: Scalars['DateTime']['output'];
  defaultPriceId?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  images?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  livemode: Scalars['Boolean']['output'];
  metadata?: Maybe<Array<KeyValuePairOfStringAndString>>;
  name?: Maybe<Scalars['String']['output']>;
  object?: Maybe<Scalars['String']['output']>;
  shippable?: Maybe<Scalars['Boolean']['output']>;
  statementDescriptor?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  unitLabel?: Maybe<Scalars['String']['output']>;
  updated: Scalars['DateTime']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type PlanProductDtoFilterInput = {
  active?: InputMaybe<BooleanOperationFilterInput>;
  and?: InputMaybe<Array<PlanProductDtoFilterInput>>;
  caption?: InputMaybe<StringOperationFilterInput>;
  created?: InputMaybe<DateTimeOperationFilterInput>;
  defaultPriceId?: InputMaybe<StringOperationFilterInput>;
  deleted?: InputMaybe<BooleanOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<StringOperationFilterInput>;
  images?: InputMaybe<ListStringOperationFilterInput>;
  livemode?: InputMaybe<BooleanOperationFilterInput>;
  metadata?: InputMaybe<ListFilterInputTypeOfKeyValuePairOfStringAndStringFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  object?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<PlanProductDtoFilterInput>>;
  shippable?: InputMaybe<BooleanOperationFilterInput>;
  statementDescriptor?: InputMaybe<StringOperationFilterInput>;
  type?: InputMaybe<StringOperationFilterInput>;
  unitLabel?: InputMaybe<StringOperationFilterInput>;
  updated?: InputMaybe<DateTimeOperationFilterInput>;
  url?: InputMaybe<StringOperationFilterInput>;
};

export type PlanProductDtoSortInput = {
  active?: InputMaybe<SortEnumType>;
  caption?: InputMaybe<SortEnumType>;
  created?: InputMaybe<SortEnumType>;
  defaultPriceId?: InputMaybe<SortEnumType>;
  deleted?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  livemode?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  object?: InputMaybe<SortEnumType>;
  shippable?: InputMaybe<SortEnumType>;
  statementDescriptor?: InputMaybe<SortEnumType>;
  type?: InputMaybe<SortEnumType>;
  unitLabel?: InputMaybe<SortEnumType>;
  updated?: InputMaybe<SortEnumType>;
  url?: InputMaybe<SortEnumType>;
};

export type PointFilterInput = {
  and?: InputMaybe<Array<PointFilterInput>>;
  area?: InputMaybe<FloatOperationFilterInput>;
  boundary?: InputMaybe<GeometryFilterInput>;
  centroid?: InputMaybe<PointFilterInput>;
  contains?: InputMaybe<GeometryContainsOperationFilterInput>;
  dimension?: InputMaybe<DimensionOperationFilterInput>;
  distance?: InputMaybe<GeometryDistanceOperationFilterInput>;
  envelope?: InputMaybe<GeometryFilterInput>;
  geometryType?: InputMaybe<StringOperationFilterInput>;
  interiorPoint?: InputMaybe<PointFilterInput>;
  intersects?: InputMaybe<GeometryIntersectsOperationFilterInput>;
  isSimple?: InputMaybe<BooleanOperationFilterInput>;
  isValid?: InputMaybe<BooleanOperationFilterInput>;
  length?: InputMaybe<FloatOperationFilterInput>;
  m?: InputMaybe<FloatOperationFilterInput>;
  ncontains?: InputMaybe<GeometryContainsOperationFilterInput>;
  nintersects?: InputMaybe<GeometryIntersectsOperationFilterInput>;
  noverlaps?: InputMaybe<GeometryOverlapsOperationFilterInput>;
  ntouches?: InputMaybe<GeometryTouchesOperationFilterInput>;
  numPoints?: InputMaybe<IntOperationFilterInput>;
  nwithin?: InputMaybe<GeometryWithinOperationFilterInput>;
  ogcGeometryType?: InputMaybe<OgcGeometryTypeOperationFilterInput>;
  or?: InputMaybe<Array<PointFilterInput>>;
  overlaps?: InputMaybe<GeometryOverlapsOperationFilterInput>;
  pointOnSurface?: InputMaybe<PointFilterInput>;
  srid?: InputMaybe<IntOperationFilterInput>;
  touches?: InputMaybe<GeometryTouchesOperationFilterInput>;
  within?: InputMaybe<GeometryWithinOperationFilterInput>;
  x?: InputMaybe<FloatOperationFilterInput>;
  y?: InputMaybe<FloatOperationFilterInput>;
  z?: InputMaybe<FloatOperationFilterInput>;
};

export type PointSortInput = {
  x?: InputMaybe<SortEnumType>;
  y?: InputMaybe<SortEnumType>;
  z?: InputMaybe<SortEnumType>;
};

export type Query = {
  __typename?: 'Query';
  agora_getAppId?: Maybe<ResponseBaseOfString>;
  agora_getRecordFiles?: Maybe<ListResponseBaseOfRecordFileDto>;
  blockUser_getBlockedUsers?: Maybe<ListResponseBaseOfUser>;
  blockUser_getNotBlockedUsers?: Maybe<ListResponseBaseOfUser>;
  category_getCategories: ListResponseBaseOfCategory;
  category_getCategory: SingleResponseBaseOfCategory;
  community_getCommunities?: Maybe<ListResponseBaseOfCommunity>;
  community_getOtherCommunities?: Maybe<ListResponseBaseOfCommunity>;
  contactUs_getContactUs?: Maybe<ResponseBaseOfContactUs>;
  dashboard_getCollaborative?: Maybe<ResponseBaseOfDashboardCollaborativeDto>;
  dashboard_getContentChart?: Maybe<ListResponseBaseOfDashboardContentChartDto>;
  dashboard_getSummary?: Maybe<ResponseBaseOfDashboardSummaryDto>;
  defaultViolation_getDefaultViolations: ListResponseBaseOfDefaultViolation;
  live_getLiveComments?: Maybe<ListResponseBaseOfLiveCommentDto>;
  live_getLiveStreams?: Maybe<ListResponseBaseOfLiveDto>;
  live_getLives?: Maybe<ListResponseBaseOfLiveDto>;
  live_getLivesForHomePage?: Maybe<ListResponseBaseOfLiveDto>;
  live_getNewLives?: Maybe<ListResponseBaseOfLiveDto>;
  live_getRecommendedLives?: Maybe<ListResponseBaseOfLiveDto>;
  live_getTrendingLives?: Maybe<ListResponseBaseOfLiveDto>;
  message_getAllReceivers?: Maybe<ListResponseBaseOfUser>;
  message_getContacts?: Maybe<ListResponseBaseOfContact>;
  message_getConversation?: Maybe<SingleResponseBaseOfConversation>;
  message_getMessages?: Maybe<ListResponseBaseOfMessage>;
  message_getSummary?: Maybe<ResponseBaseOfMessageSummaryDto>;
  message_getUserMessages?: Maybe<ListResponseBaseOfConversationDto>;
  notification_getDisabledNotificationFromUsers?: Maybe<ListResponseBaseOfDisabledNotificationFromUser>;
  notification_getNotificationSettings?: Maybe<ListResponseBaseOfNotificationSettings>;
  notification_getNotifications?: Maybe<ListResponseBaseOfNotification>;
  paymentStripe_appStorePaymentValidation?: Maybe<ResponseBaseOfPaymentValidationResultDto>;
  paymentStripe_geBalance?: Maybe<ResponseBaseOfBalanceDto>;
  paymentStripe_geCharges?: Maybe<ListResponseBaseOfChargeDto>;
  paymentStripe_geCustomers?: Maybe<ListResponseBaseOfCustomerDto>;
  paymentStripe_geDisputes?: Maybe<ListResponseBaseOfDisputeDto>;
  paymentStripe_gePlans?: Maybe<ListResponseBaseOfPlanDto>;
  paymentStripe_geRefunds?: Maybe<ListResponseBaseOfRefundDto>;
  paymentStripe_geTransactions?: Maybe<ListResponseBaseOfBalanceTransactionDto>;
  paymentStripe_getApsyPublishableKey?: Maybe<Scalars['String']['output']>;
  paymentStripe_getConnectUserBlance?: Maybe<ResponseBaseOfInt64>;
  paymentStripe_getConnectedUser?: Maybe<ResponseBaseOfAccountDto>;
  paymentStripe_getPaymentMethods?: Maybe<ListResponseBaseOfStripePaymentMethod>;
  paymentStripe_getPlatformBlance?: Maybe<ResponseBaseOfInt64>;
  paymentStripe_getPublishableKey?: Maybe<Scalars['String']['output']>;
  paymentStripe_getUserPaymentAccount?: Maybe<SingleResponseBaseOfUserPaymentAccount>;
  paymentStripe_hasEnoughBalanceForConnectUser?: Maybe<ResponseBaseOfBoolean>;
  paymentStripe_hasEnoughBalanceForPlatform?: Maybe<ResponseBaseOfBoolean>;
  paymentStripe_hasStripeAccount?: Maybe<ResponseBaseOfBoolean>;
  paymentStripe_isTransferEnabled?: Maybe<ResponseStatus>;
  social_getFollowSummary?: Maybe<ResponseBaseOfFollowSummaryDto>;
  social_getUser?: Maybe<SingleResponseBaseOfUserDto>;
  social_getUserFollowerFollowees?: Maybe<ListResponseBaseOfFollowerFolloweeDto>;
  social_getUsers?: Maybe<ListResponseBaseOfUserDto>;
  social_isUserFollower?: Maybe<ResponseBaseOfBoolean>;
  tip_getTips?: Maybe<ListResponseBaseOfTip>;
  user_doesEmailExist?: Maybe<ResponseStatus>;
  user_doesPhoneNumberExist?: Maybe<ResponseStatus>;
  user_getCastersToFollow?: Maybe<ListResponseBaseOfUser>;
  user_getCurrentUser?: Maybe<SingleResponseBaseOfUser>;
  user_getInvites?: Maybe<ListResponseBaseOfInvite>;
  user_getLoginActivities?: Maybe<ListResponseBaseOfLoginActivity>;
  user_getNearbyUsers?: Maybe<ListResponseBaseOfUser>;
  user_getPhoto?: Maybe<SingleResponseBaseOfUserPhotoGallery>;
  user_getPhotos?: Maybe<ListResponseBaseOfUserPhotoGallery>;
  user_getRequestForVerifications?: Maybe<ListResponseBaseOfRequestForVerification>;
  user_getRolesForSignUp?: Maybe<ListResponseBaseOfRole>;
  user_getSummary?: Maybe<ResponseBaseOfUserSummaryDto>;
  user_getUsers?: Maybe<ListResponseBaseOfUser>;
  violationReport_getViolationReport: SingleResponseBaseOfViolationReport;
  violationReport_getViolationReports: ListResponseBaseOfViolationReport;
};

export type QueryAgora_GetRecordFilesArgs = {
  liveId?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryCategory_GetCategoryArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryDashboard_GetCollaborativeArgs = {
  period: DashboardPeriod;
};

export type QueryDashboard_GetContentChartArgs = {
  period: DashboardPeriod;
};

export type QueryLive_GetLiveCommentsArgs = {
  liveId: Scalars['Int']['input'];
};

export type QueryLive_GetLivesForHomePageArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
};

export type QueryMessage_GetConversationArgs = {
  conversationId: Scalars['Int']['input'];
};

export type QueryPaymentStripe_AppStorePaymentValidationArgs = {
  receiptData?: InputMaybe<Scalars['String']['input']>;
};

export type QueryPaymentStripe_GeBalanceArgs = {
  stripeConnectedUserId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryPaymentStripe_GetConnectUserBlanceArgs = {
  userStripeAccountId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryPaymentStripe_GetConnectedUserArgs = {
  stripeConnectedUserId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryPaymentStripe_HasEnoughBalanceForConnectUserArgs = {
  amount: Scalars['Float']['input'];
  userStripeAccountId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryPaymentStripe_HasEnoughBalanceForPlatformArgs = {
  amount: Scalars['Float']['input'];
};

export type QueryPaymentStripe_HasStripeAccountArgs = {
  userStripeAccountId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryPaymentStripe_IsTransferEnabledArgs = {
  userStripeAccountId?: InputMaybe<Scalars['String']['input']>;
};

export type QuerySocial_GetUserArgs = {
  otherId: Scalars['Int']['input'];
};

export type QuerySocial_GetUserFollowerFolloweesArgs = {
  userId: Scalars['Int']['input'];
};

export type QuerySocial_IsUserFollowerArgs = {
  followerId: Scalars['Int']['input'];
  userid: Scalars['Int']['input'];
};

export type QueryUser_DoesEmailExistArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
};

export type QueryUser_DoesPhoneNumberExistArgs = {
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type QueryUser_GetCastersToFollowArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
};

export type QueryUser_GetNearbyUsersArgs = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  maxDistance: Scalars['Float']['input'];
  maxDistanceInMile: Scalars['Boolean']['input'];
};

export type QueryUser_GetPhotoArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryUser_GetPhotosArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryViolationReport_GetViolationReportArgs = {
  entityId: Scalars['Int']['input'];
};

export type RecordFileDto = {
  __typename?: 'RecordFileDto';
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type RecordFileDtoCollectionSegment = {
  __typename?: 'RecordFileDtoCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<RecordFileDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type RecordFileDtoConnection = {
  __typename?: 'RecordFileDtoConnection';
  /** A list of edges. */
  edges?: Maybe<Array<RecordFileDtoEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<RecordFileDto>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type RecordFileDtoEdge = {
  __typename?: 'RecordFileDtoEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<RecordFileDto>;
};

export type RecordFileDtoFilterInput = {
  and?: InputMaybe<Array<RecordFileDtoFilterInput>>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<RecordFileDtoFilterInput>>;
  url?: InputMaybe<StringOperationFilterInput>;
};

export type RecordFileDtoSortInput = {
  name?: InputMaybe<SortEnumType>;
  url?: InputMaybe<SortEnumType>;
};

export type RefundDto = {
  __typename?: 'RefundDto';
  amount: Scalars['Long']['output'];
  charge?: Maybe<ChargeDto>;
  chargeId?: Maybe<Scalars['String']['output']>;
  created: Scalars['DateTime']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  failureBalanceTransactionId?: Maybe<Scalars['String']['output']>;
  failureReason?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  instructionsEmail?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Array<KeyValuePairOfStringAndString>>;
  object?: Maybe<Scalars['String']['output']>;
  paymentIntentId?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  receiptNumber?: Maybe<Scalars['String']['output']>;
  sourceTransferReversalId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  transferReversalId?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type RefundDtoCollectionSegment = {
  __typename?: 'RefundDtoCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<RefundDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type RefundDtoConnection = {
  __typename?: 'RefundDtoConnection';
  /** A list of edges. */
  edges?: Maybe<Array<RefundDtoEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<RefundDto>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type RefundDtoEdge = {
  __typename?: 'RefundDtoEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<RefundDto>;
};

export type RefundDtoFilterInput = {
  amount?: InputMaybe<LongOperationFilterInput>;
  and?: InputMaybe<Array<RefundDtoFilterInput>>;
  charge?: InputMaybe<ChargeDtoFilterInput>;
  chargeId?: InputMaybe<StringOperationFilterInput>;
  created?: InputMaybe<DateTimeOperationFilterInput>;
  currency?: InputMaybe<StringOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  failureBalanceTransactionId?: InputMaybe<StringOperationFilterInput>;
  failureReason?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<StringOperationFilterInput>;
  instructionsEmail?: InputMaybe<StringOperationFilterInput>;
  metadata?: InputMaybe<ListFilterInputTypeOfKeyValuePairOfStringAndStringFilterInput>;
  object?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<RefundDtoFilterInput>>;
  paymentIntentId?: InputMaybe<StringOperationFilterInput>;
  reason?: InputMaybe<StringOperationFilterInput>;
  receiptNumber?: InputMaybe<StringOperationFilterInput>;
  sourceTransferReversalId?: InputMaybe<StringOperationFilterInput>;
  status?: InputMaybe<StringOperationFilterInput>;
  transferReversalId?: InputMaybe<StringOperationFilterInput>;
};

export type RefundDtoSortInput = {
  amount?: InputMaybe<SortEnumType>;
  charge?: InputMaybe<ChargeDtoSortInput>;
  chargeId?: InputMaybe<SortEnumType>;
  created?: InputMaybe<SortEnumType>;
  currency?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  failureBalanceTransactionId?: InputMaybe<SortEnumType>;
  failureReason?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  instructionsEmail?: InputMaybe<SortEnumType>;
  object?: InputMaybe<SortEnumType>;
  paymentIntentId?: InputMaybe<SortEnumType>;
  reason?: InputMaybe<SortEnumType>;
  receiptNumber?: InputMaybe<SortEnumType>;
  sourceTransferReversalId?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  transferReversalId?: InputMaybe<SortEnumType>;
};

export type RequestForVerification = {
  __typename?: 'RequestForVerification';
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  status: VerificationStatus;
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type RequestForVerificationCollectionSegment = {
  __typename?: 'RequestForVerificationCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<RequestForVerification>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type RequestForVerificationConnection = {
  __typename?: 'RequestForVerificationConnection';
  /** A list of edges. */
  edges?: Maybe<Array<RequestForVerificationEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<RequestForVerification>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type RequestForVerificationEdge = {
  __typename?: 'RequestForVerificationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<RequestForVerification>;
};

export type RequestForVerificationFilterInput = {
  and?: InputMaybe<Array<RequestForVerificationFilterInput>>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<RequestForVerificationFilterInput>>;
  status?: InputMaybe<VerificationStatusOperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<IntOperationFilterInput>;
};

export type RequestForVerificationInput = {
  id: Scalars['Int']['input'];
  status?: InputMaybe<VerificationStatus>;
};

export type RequestForVerificationSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type ResetPasswordUsingEmailInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  newPassword?: InputMaybe<Scalars['String']['input']>;
  verificationCode?: InputMaybe<Scalars['String']['input']>;
};

export type ResponseBase = {
  __typename?: 'ResponseBase';
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfAccountDto = {
  __typename?: 'ResponseBaseOfAccountDto';
  result?: Maybe<AccountDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfBalanceDto = {
  __typename?: 'ResponseBaseOfBalanceDto';
  result?: Maybe<BalanceDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfBlockUser = {
  __typename?: 'ResponseBaseOfBlockUser';
  result?: Maybe<BlockUser>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfBoolean = {
  __typename?: 'ResponseBaseOfBoolean';
  result: Scalars['Boolean']['output'];
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfCategory = {
  __typename?: 'ResponseBaseOfCategory';
  result?: Maybe<Category>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfChargeDto = {
  __typename?: 'ResponseBaseOfChargeDto';
  result?: Maybe<ChargeDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfCommunity = {
  __typename?: 'ResponseBaseOfCommunity';
  result?: Maybe<Community>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfCommunityMessage = {
  __typename?: 'ResponseBaseOfCommunityMessage';
  result?: Maybe<CommunityMessage>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfCommunityRequest = {
  __typename?: 'ResponseBaseOfCommunityRequest';
  result?: Maybe<CommunityRequest>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfCommunityUser = {
  __typename?: 'ResponseBaseOfCommunityUser';
  result?: Maybe<CommunityUser>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfContact = {
  __typename?: 'ResponseBaseOfContact';
  result?: Maybe<Contact>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfContactUs = {
  __typename?: 'ResponseBaseOfContactUs';
  result?: Maybe<ContactUs>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfConversation = {
  __typename?: 'ResponseBaseOfConversation';
  result?: Maybe<Conversation>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfCustomerDto = {
  __typename?: 'ResponseBaseOfCustomerDto';
  result?: Maybe<CustomerDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfDashboardCollaborativeDto = {
  __typename?: 'ResponseBaseOfDashboardCollaborativeDto';
  result?: Maybe<DashboardCollaborativeDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfDashboardSummaryDto = {
  __typename?: 'ResponseBaseOfDashboardSummaryDto';
  result?: Maybe<DashboardSummaryDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfDefaultViolation = {
  __typename?: 'ResponseBaseOfDefaultViolation';
  result?: Maybe<DefaultViolation>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfDisabledNotificationFromUser = {
  __typename?: 'ResponseBaseOfDisabledNotificationFromUser';
  result?: Maybe<DisabledNotificationFromUser>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfFollowSummaryDto = {
  __typename?: 'ResponseBaseOfFollowSummaryDto';
  result?: Maybe<FollowSummaryDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfFollower = {
  __typename?: 'ResponseBaseOfFollower';
  result?: Maybe<Follower>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfInt64 = {
  __typename?: 'ResponseBaseOfInt64';
  result: Scalars['Long']['output'];
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfInvite = {
  __typename?: 'ResponseBaseOfInvite';
  result?: Maybe<Invite>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfLive = {
  __typename?: 'ResponseBaseOfLive';
  result?: Maybe<Live>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfLiveComment = {
  __typename?: 'ResponseBaseOfLiveComment';
  result?: Maybe<LiveComment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfLoginActivity = {
  __typename?: 'ResponseBaseOfLoginActivity';
  result?: Maybe<LoginActivity>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfMessage = {
  __typename?: 'ResponseBaseOfMessage';
  result?: Maybe<Message>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfMessageSummaryDto = {
  __typename?: 'ResponseBaseOfMessageSummaryDto';
  result?: Maybe<MessageSummaryDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfNotification = {
  __typename?: 'ResponseBaseOfNotification';
  result?: Maybe<Notification>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfOnboardStripeConnectDto = {
  __typename?: 'ResponseBaseOfOnboardStripeConnectDto';
  result?: Maybe<OnboardStripeConnectDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfPayWithIntentDto = {
  __typename?: 'ResponseBaseOfPayWithIntentDto';
  result?: Maybe<PayWithIntentDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfPaymentValidationResultDto = {
  __typename?: 'ResponseBaseOfPaymentValidationResultDto';
  result?: Maybe<PaymentValidationResultDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfRequestForVerification = {
  __typename?: 'ResponseBaseOfRequestForVerification';
  result?: Maybe<RequestForVerification>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfSentEmail = {
  __typename?: 'ResponseBaseOfSentEmail';
  result?: Maybe<SentEmail>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfString = {
  __typename?: 'ResponseBaseOfString';
  result?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfStringDto = {
  __typename?: 'ResponseBaseOfStringDto';
  result?: Maybe<StringDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfTip = {
  __typename?: 'ResponseBaseOfTip';
  result?: Maybe<Tip>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfTransferDto = {
  __typename?: 'ResponseBaseOfTransferDto';
  result?: Maybe<TransferDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfUser = {
  __typename?: 'ResponseBaseOfUser';
  result?: Maybe<User>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfUserPhotoGallery = {
  __typename?: 'ResponseBaseOfUserPhotoGallery';
  result?: Maybe<UserPhotoGallery>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfUserSummaryDto = {
  __typename?: 'ResponseBaseOfUserSummaryDto';
  result?: Maybe<UserSummaryDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfUserTokenDtoOfUser = {
  __typename?: 'ResponseBaseOfUserTokenDtoOfUser';
  result?: Maybe<UserTokenDtoOfUser>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfViolationReport = {
  __typename?: 'ResponseBaseOfViolationReport';
  result?: Maybe<ViolationReport>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfWalletHistory = {
  __typename?: 'ResponseBaseOfWalletHistory';
  result?: Maybe<WalletHistory>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseStatus = {
  __typename?: 'ResponseStatus';
  code: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type Role = {
  __typename?: 'Role';
  allowedInSignUp: Scalars['Boolean']['output'];
  concurrencyStamp?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  normalizedName?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type RoleCollectionSegment = {
  __typename?: 'RoleCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Role>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type RoleConnection = {
  __typename?: 'RoleConnection';
  /** A list of edges. */
  edges?: Maybe<Array<RoleEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<Role>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type RoleEdge = {
  __typename?: 'RoleEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Role>;
};

export type RoleFilterInput = {
  allowedInSignUp?: InputMaybe<BooleanOperationFilterInput>;
  and?: InputMaybe<Array<RoleFilterInput>>;
  concurrencyStamp?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  normalizedName?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<RoleFilterInput>>;
};

export type RoleSortInput = {
  allowedInSignUp?: InputMaybe<SortEnumType>;
  concurrencyStamp?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  normalizedName?: InputMaybe<SortEnumType>;
};

export type SendVerificationCodeToEmailInput = {
  callbackUrl?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  isForResetPassword: Scalars['Boolean']['input'];
};

export type SentEmail = {
  __typename?: 'SentEmail';
  createdDate: Scalars['DateTime']['output'];
  htmlContent?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  plainTextContent: Scalars['String']['output'];
  subject: Scalars['String']['output'];
  toEmailAddress: Scalars['String']['output'];
  toName?: Maybe<Scalars['String']['output']>;
};

export type SignInExternalInput = {
  token?: InputMaybe<Scalars['String']['input']>;
};

export type SignInUsingPhoneNumberInput = {
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  verificationCode?: InputMaybe<Scalars['String']['input']>;
};

export type SignUpExternalInput = {
  roleId?: InputMaybe<Scalars['Int']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};

export type SignUpInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  roleId?: InputMaybe<Scalars['Int']['input']>;
};

export type SigninInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type SingleResponseBaseOfCategory = {
  __typename?: 'SingleResponseBaseOfCategory';
  result?: Maybe<Category>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfConversation = {
  __typename?: 'SingleResponseBaseOfConversation';
  result?: Maybe<Conversation>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfFollower = {
  __typename?: 'SingleResponseBaseOfFollower';
  result?: Maybe<Follower>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfUser = {
  __typename?: 'SingleResponseBaseOfUser';
  result?: Maybe<User>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfUserDto = {
  __typename?: 'SingleResponseBaseOfUserDto';
  result?: Maybe<UserDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfUserPaymentAccount = {
  __typename?: 'SingleResponseBaseOfUserPaymentAccount';
  result?: Maybe<UserPaymentAccount>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfUserPhotoGallery = {
  __typename?: 'SingleResponseBaseOfUserPhotoGallery';
  result?: Maybe<UserPhotoGallery>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfViolationReport = {
  __typename?: 'SingleResponseBaseOfViolationReport';
  result?: Maybe<ViolationReport>;
  status?: Maybe<Scalars['Any']['output']>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type StringDto = {
  __typename?: 'StringDto';
  data?: Maybe<Scalars['String']['output']>;
};

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StripFullPaymentInput = {
  amount: Scalars['Long']['input'];
  cardNumder: Scalars['String']['input'];
  currency?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['String']['input']>;
  cvc: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  entityId: Scalars['Int']['input'];
  expMonth: Scalars['Long']['input'];
  expYear: Scalars['Long']['input'];
  metadata?: InputMaybe<Array<KeyValuePairOfStringAndStringInput>>;
};

export type StripPaymentInput = {
  amount: Scalars['Float']['input'];
  customerId?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Array<KeyValuePairOfStringAndStringInput>>;
  stripeToken?: InputMaybe<Scalars['String']['input']>;
};

export type StripeConnectError = {
  __typename?: 'StripeConnectError';
  code?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  requirement?: Maybe<Scalars['String']['output']>;
};

export type StripePaymentInput = {
  amount: Scalars['Long']['input'];
  cardName?: InputMaybe<Scalars['String']['input']>;
  cardNumder?: InputMaybe<Scalars['String']['input']>;
  cvc?: InputMaybe<Scalars['String']['input']>;
  entityId?: InputMaybe<Scalars['Int']['input']>;
  entityName?: InputMaybe<Scalars['String']['input']>;
  expMonth?: InputMaybe<Scalars['String']['input']>;
  expYear?: InputMaybe<Scalars['String']['input']>;
  paymentMethodId?: InputMaybe<Scalars['String']['input']>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type StripePaymentMethod = {
  __typename?: 'StripePaymentMethod';
  apsyPaymentMethodId?: Maybe<Scalars['String']['output']>;
  brand?: Maybe<Scalars['String']['output']>;
  cardName?: Maybe<Scalars['String']['output']>;
  expMonth?: Maybe<Scalars['Long']['output']>;
  expYear?: Maybe<Scalars['Long']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  issuer?: Maybe<Scalars['String']['output']>;
  last4?: Maybe<Scalars['String']['output']>;
  saveForFuturePurchases: Scalars['Boolean']['output'];
  zipCode?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type StripePaymentMethodCollectionSegment = {
  __typename?: 'StripePaymentMethodCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<StripePaymentMethod>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type StripePaymentMethodConnection = {
  __typename?: 'StripePaymentMethodConnection';
  /** A list of edges. */
  edges?: Maybe<Array<StripePaymentMethodEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<StripePaymentMethod>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type StripePaymentMethodEdge = {
  __typename?: 'StripePaymentMethodEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<StripePaymentMethod>;
};

export type StripePaymentMethodFilterInput = {
  and?: InputMaybe<Array<StripePaymentMethodFilterInput>>;
  apsyPaymentMethodId?: InputMaybe<StringOperationFilterInput>;
  brand?: InputMaybe<StringOperationFilterInput>;
  cardName?: InputMaybe<StringOperationFilterInput>;
  expMonth?: InputMaybe<LongOperationFilterInput>;
  expYear?: InputMaybe<LongOperationFilterInput>;
  id?: InputMaybe<StringOperationFilterInput>;
  issuer?: InputMaybe<StringOperationFilterInput>;
  last4?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<StripePaymentMethodFilterInput>>;
  saveForFuturePurchases?: InputMaybe<BooleanOperationFilterInput>;
  zipCode?: InputMaybe<StringOperationFilterInput>;
};

export type StripePaymentMethodSortInput = {
  apsyPaymentMethodId?: InputMaybe<SortEnumType>;
  brand?: InputMaybe<SortEnumType>;
  cardName?: InputMaybe<SortEnumType>;
  expMonth?: InputMaybe<SortEnumType>;
  expYear?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  issuer?: InputMaybe<SortEnumType>;
  last4?: InputMaybe<SortEnumType>;
  saveForFuturePurchases?: InputMaybe<SortEnumType>;
  zipCode?: InputMaybe<SortEnumType>;
};

export type Subscription = {
  __typename?: 'Subscription';
  notificationAdded?: Maybe<Notification>;
  testSubscription: Scalars['Int']['output'];
};

export type SubscriptionNotificationAddedArgs = {
  userId: Scalars['Int']['input'];
};

export type TimeSpanOperationFilterInput = {
  eq?: InputMaybe<Scalars['TimeSpan']['input']>;
  gt?: InputMaybe<Scalars['TimeSpan']['input']>;
  gte?: InputMaybe<Scalars['TimeSpan']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['TimeSpan']['input']>>>;
  lt?: InputMaybe<Scalars['TimeSpan']['input']>;
  lte?: InputMaybe<Scalars['TimeSpan']['input']>;
  neq?: InputMaybe<Scalars['TimeSpan']['input']>;
  ngt?: InputMaybe<Scalars['TimeSpan']['input']>;
  ngte?: InputMaybe<Scalars['TimeSpan']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['TimeSpan']['input']>>>;
  nlt?: InputMaybe<Scalars['TimeSpan']['input']>;
  nlte?: InputMaybe<Scalars['TimeSpan']['input']>;
};

export type Tip = {
  __typename?: 'Tip';
  createdDate: Scalars['DateTime']['output'];
  forUser?: Maybe<User>;
  forUserId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
  value: Scalars['Decimal']['output'];
};

/** A segment of a collection. */
export type TipCollectionSegment = {
  __typename?: 'TipCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Tip>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type TipConnection = {
  __typename?: 'TipConnection';
  /** A list of edges. */
  edges?: Maybe<Array<TipEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<Tip>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type TipEdge = {
  __typename?: 'TipEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Tip>;
};

export type TipFilterInput = {
  and?: InputMaybe<Array<TipFilterInput>>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  forUser?: InputMaybe<UserFilterInput>;
  forUserId?: InputMaybe<IntOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<TipFilterInput>>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<IntOperationFilterInput>;
  value?: InputMaybe<DecimalOperationFilterInput>;
};

export type TipInput = {
  forUserId: Scalars['Int']['input'];
  value: Scalars['Int']['input'];
};

export type TipSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  forUser?: InputMaybe<UserSortInput>;
  forUserId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
  value?: InputMaybe<SortEnumType>;
};

export type TokenInput = {
  accessToken?: InputMaybe<Scalars['String']['input']>;
  refreshToken?: InputMaybe<Scalars['String']['input']>;
};

export type TransferDto = {
  __typename?: 'TransferDto';
  amount: Scalars['Long']['output'];
  amountReversed: Scalars['Long']['output'];
  balanceTransactionId?: Maybe<Scalars['String']['output']>;
  created: Scalars['DateTime']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  destination?: Maybe<AccountDto>;
  destinationId?: Maybe<Scalars['String']['output']>;
  destinationPayment?: Maybe<ChargeDto>;
  destinationPaymentId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  livemode: Scalars['Boolean']['output'];
  metadata?: Maybe<Array<KeyValuePairOfStringAndString>>;
  object?: Maybe<Scalars['String']['output']>;
  reversed: Scalars['Boolean']['output'];
  sourceTransaction?: Maybe<ChargeDto>;
  sourceTransactionId?: Maybe<Scalars['String']['output']>;
  sourceType?: Maybe<Scalars['String']['output']>;
  transferGroup?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  about?: Maybe<Scalars['String']['output']>;
  accessFailedCount: Scalars['Int']['output'];
  age?: Maybe<Scalars['Int']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  communityCount: Scalars['Int']['output'];
  concurrencyStamp?: Maybe<Scalars['String']['output']>;
  config?: Maybe<Scalars['String']['output']>;
  createdDate?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  displayContactInfo?: Maybe<Scalars['Boolean']['output']>;
  displayGender?: Maybe<Scalars['Boolean']['output']>;
  education?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emailConfirmed: Scalars['Boolean']['output'];
  externalId: Scalars['String']['output'];
  favoriteCategories?: Maybe<Scalars['String']['output']>;
  followeeCount: Scalars['Int']['output'];
  followees?: Maybe<Array<Maybe<Follower>>>;
  followerCount: Scalars['Int']['output'];
  followers?: Maybe<Array<Maybe<Follower>>>;
  fullName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Gender>;
  height?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  introSeen: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isPrivateAccount: Scalars['Boolean']['output'];
  isVerified: Scalars['Boolean']['output'];
  languages?: Maybe<Scalars['String']['output']>;
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  lastSeen?: Maybe<Scalars['DateTime']['output']>;
  /** @deprecated Use LocationOfUser */
  latitude?: Maybe<Scalars['Float']['output']>;
  liveCount: Scalars['Int']['output'];
  lives?: Maybe<Array<Maybe<Live>>>;
  location?: Maybe<Scalars['String']['output']>;
  locationOfUser?: Maybe<GeoJsonPointType>;
  lockoutEnabled: Scalars['Boolean']['output'];
  lockoutEnd?: Maybe<Scalars['DateTime']['output']>;
  /** @deprecated Use LocationOfUser */
  longitude?: Maybe<Scalars['Float']['output']>;
  moneySpent: Scalars['Decimal']['output'];
  normalizedEmail?: Maybe<Scalars['String']['output']>;
  normalizedUserName?: Maybe<Scalars['String']['output']>;
  passwordHash?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  phoneNumberConfirmed: Scalars['Boolean']['output'];
  photoUrl?: Maybe<Scalars['String']['output']>;
  profession?: Maybe<Scalars['String']['output']>;
  professionalSummary?: Maybe<Scalars['String']['output']>;
  rateAverage: Scalars['Float']['output'];
  ratePercent_1: Scalars['Float']['output'];
  ratePercent_2: Scalars['Float']['output'];
  ratePercent_3: Scalars['Float']['output'];
  ratePercent_4: Scalars['Float']['output'];
  ratePercent_5: Scalars['Float']['output'];
  requestCount: Scalars['Int']['output'];
  reviewCount: Scalars['Int']['output'];
  securityStamp?: Maybe<Scalars['String']['output']>;
  skills?: Maybe<Scalars['String']['output']>;
  socialLinks?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  streetAddress?: Maybe<Scalars['String']['output']>;
  stripeConnectAccountId?: Maybe<Scalars['String']['output']>;
  stripeConnectCompleted: Scalars['Boolean']['output'];
  timeSpent: Scalars['Float']['output'];
  twoFactorAuthenticationCode?: Maybe<Scalars['String']['output']>;
  twoFactorAuthenticationEnabled?: Maybe<Scalars['Boolean']['output']>;
  twoFactorEnabled: Scalars['Boolean']['output'];
  unitNumber?: Maybe<Scalars['String']['output']>;
  userRole?: Maybe<Scalars['String']['output']>;
  userType?: Maybe<UserType>;
  username?: Maybe<Scalars['String']['output']>;
  verificationErrors?: Maybe<Scalars['String']['output']>;
  verificationPhotos?: Maybe<Scalars['String']['output']>;
  wallet: Scalars['Decimal']['output'];
  workExperience?: Maybe<Scalars['String']['output']>;
  yearsOfExperience?: Maybe<Scalars['Int']['output']>;
  zipCode?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type UserCollectionSegment = {
  __typename?: 'UserCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<User>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type UserConnection = {
  __typename?: 'UserConnection';
  /** A list of edges. */
  edges?: Maybe<Array<UserEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<User>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

export type UserDto = {
  __typename?: 'UserDto';
  followedCount: Scalars['Int']['output'];
  followersCount: Scalars['Int']['output'];
  isFollowed: Scalars['Boolean']['output'];
  isFollower: Scalars['Boolean']['output'];
  requestReceived: Scalars['Boolean']['output'];
  requestSent: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

/** A segment of a collection. */
export type UserDtoCollectionSegment = {
  __typename?: 'UserDtoCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<UserDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type UserDtoConnection = {
  __typename?: 'UserDtoConnection';
  /** A list of edges. */
  edges?: Maybe<Array<UserDtoEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<UserDto>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type UserDtoEdge = {
  __typename?: 'UserDtoEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<UserDto>;
};

export type UserDtoFilterInput = {
  and?: InputMaybe<Array<UserDtoFilterInput>>;
  followedCount?: InputMaybe<IntOperationFilterInput>;
  followersCount?: InputMaybe<IntOperationFilterInput>;
  isFollowed?: InputMaybe<BooleanOperationFilterInput>;
  isFollower?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<UserDtoFilterInput>>;
  requestReceived?: InputMaybe<BooleanOperationFilterInput>;
  requestSent?: InputMaybe<BooleanOperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
};

export type UserDtoSortInput = {
  followedCount?: InputMaybe<SortEnumType>;
  followersCount?: InputMaybe<SortEnumType>;
  isFollowed?: InputMaybe<SortEnumType>;
  isFollower?: InputMaybe<SortEnumType>;
  requestReceived?: InputMaybe<SortEnumType>;
  requestSent?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
};

/** An edge in a connection. */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<User>;
};

export type UserFilterInput = {
  about?: InputMaybe<StringOperationFilterInput>;
  accessFailedCount?: InputMaybe<IntOperationFilterInput>;
  age?: InputMaybe<IntOperationFilterInput>;
  and?: InputMaybe<Array<UserFilterInput>>;
  city?: InputMaybe<StringOperationFilterInput>;
  communityCount?: InputMaybe<IntOperationFilterInput>;
  concurrencyStamp?: InputMaybe<StringOperationFilterInput>;
  config?: InputMaybe<StringOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  data?: InputMaybe<StringOperationFilterInput>;
  dateOfBirth?: InputMaybe<DateTimeOperationFilterInput>;
  displayContactInfo?: InputMaybe<BooleanOperationFilterInput>;
  displayGender?: InputMaybe<BooleanOperationFilterInput>;
  education?: InputMaybe<StringOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  emailConfirmed?: InputMaybe<BooleanOperationFilterInput>;
  externalId?: InputMaybe<StringOperationFilterInput>;
  favoriteCategories?: InputMaybe<StringOperationFilterInput>;
  followeeCount?: InputMaybe<IntOperationFilterInput>;
  followees?: InputMaybe<ListFilterInputTypeOfFollowerFilterInput>;
  followerCount?: InputMaybe<IntOperationFilterInput>;
  followers?: InputMaybe<ListFilterInputTypeOfFollowerFilterInput>;
  fullName?: InputMaybe<StringOperationFilterInput>;
  gender?: InputMaybe<NullableOfGenderOperationFilterInput>;
  height?: InputMaybe<IntOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  introSeen?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isPrivateAccount?: InputMaybe<BooleanOperationFilterInput>;
  isVerified?: InputMaybe<BooleanOperationFilterInput>;
  languages?: InputMaybe<StringOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  lastSeen?: InputMaybe<DateTimeOperationFilterInput>;
  latitude?: InputMaybe<FloatOperationFilterInput>;
  liveCount?: InputMaybe<IntOperationFilterInput>;
  lives?: InputMaybe<ListFilterInputTypeOfLiveFilterInput>;
  location?: InputMaybe<StringOperationFilterInput>;
  locationOfUser?: InputMaybe<PointFilterInput>;
  lockoutEnabled?: InputMaybe<BooleanOperationFilterInput>;
  lockoutEnd?: InputMaybe<DateTimeOperationFilterInput>;
  longitude?: InputMaybe<FloatOperationFilterInput>;
  moneySpent?: InputMaybe<DecimalOperationFilterInput>;
  normalizedEmail?: InputMaybe<StringOperationFilterInput>;
  normalizedUserName?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<UserFilterInput>>;
  passwordHash?: InputMaybe<StringOperationFilterInput>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  phoneNumberConfirmed?: InputMaybe<BooleanOperationFilterInput>;
  photoUrl?: InputMaybe<StringOperationFilterInput>;
  profession?: InputMaybe<StringOperationFilterInput>;
  professionalSummary?: InputMaybe<StringOperationFilterInput>;
  rateAverage?: InputMaybe<FloatOperationFilterInput>;
  ratePercent_1?: InputMaybe<FloatOperationFilterInput>;
  ratePercent_2?: InputMaybe<FloatOperationFilterInput>;
  ratePercent_3?: InputMaybe<FloatOperationFilterInput>;
  ratePercent_4?: InputMaybe<FloatOperationFilterInput>;
  ratePercent_5?: InputMaybe<FloatOperationFilterInput>;
  requestCount?: InputMaybe<IntOperationFilterInput>;
  reviewCount?: InputMaybe<IntOperationFilterInput>;
  securityStamp?: InputMaybe<StringOperationFilterInput>;
  skills?: InputMaybe<StringOperationFilterInput>;
  socialLinks?: InputMaybe<StringOperationFilterInput>;
  state?: InputMaybe<StringOperationFilterInput>;
  streetAddress?: InputMaybe<StringOperationFilterInput>;
  stripeConnectAccountId?: InputMaybe<StringOperationFilterInput>;
  stripeConnectCompleted?: InputMaybe<BooleanOperationFilterInput>;
  timeSpent?: InputMaybe<FloatOperationFilterInput>;
  twoFactorAuthenticationCode?: InputMaybe<StringOperationFilterInput>;
  twoFactorAuthenticationEnabled?: InputMaybe<BooleanOperationFilterInput>;
  twoFactorEnabled?: InputMaybe<BooleanOperationFilterInput>;
  unitNumber?: InputMaybe<StringOperationFilterInput>;
  userRole?: InputMaybe<StringOperationFilterInput>;
  userType?: InputMaybe<NullableOfUserTypeOperationFilterInput>;
  username?: InputMaybe<StringOperationFilterInput>;
  verificationErrors?: InputMaybe<StringOperationFilterInput>;
  verificationPhotos?: InputMaybe<StringOperationFilterInput>;
  wallet?: InputMaybe<DecimalOperationFilterInput>;
  workExperience?: InputMaybe<StringOperationFilterInput>;
  yearsOfExperience?: InputMaybe<IntOperationFilterInput>;
  zipCode?: InputMaybe<StringOperationFilterInput>;
};

export type UserGroup = {
  __typename?: 'UserGroup';
  conversation?: Maybe<Conversation>;
  conversationId: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  unreadCount: Scalars['Int']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type UserGroupFilterInput = {
  and?: InputMaybe<Array<UserGroupFilterInput>>;
  conversation?: InputMaybe<ConversationFilterInput>;
  conversationId?: InputMaybe<IntOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<UserGroupFilterInput>>;
  unreadCount?: InputMaybe<IntOperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<IntOperationFilterInput>;
};

export type UserGroupInput = {
  groupDescription?: InputMaybe<Scalars['String']['input']>;
  groupImgageUrl?: InputMaybe<Scalars['String']['input']>;
  groupName: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['Int']['input']>;
};

export type UserInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  age?: InputMaybe<Scalars['Int']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  config?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  displayContactInfo?: InputMaybe<Scalars['Boolean']['input']>;
  displayGender?: InputMaybe<Scalars['Boolean']['input']>;
  education?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  favoriteCategories?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  height?: InputMaybe<Scalars['Int']['input']>;
  introSeen?: InputMaybe<Scalars['Boolean']['input']>;
  isPrivateAccount?: InputMaybe<Scalars['Boolean']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  languages?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  photoUrl?: InputMaybe<Scalars['String']['input']>;
  profession?: InputMaybe<Scalars['String']['input']>;
  professionalSummary?: InputMaybe<Scalars['String']['input']>;
  skills?: InputMaybe<Scalars['String']['input']>;
  socialLinks?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  streetAddress?: InputMaybe<Scalars['String']['input']>;
  twoFactorAuthenticationEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  unitNumber?: InputMaybe<Scalars['String']['input']>;
  userRole?: InputMaybe<Scalars['String']['input']>;
  userType?: InputMaybe<UserType>;
  username?: InputMaybe<Scalars['String']['input']>;
  verificationErrors?: InputMaybe<Scalars['String']['input']>;
  verificationPhotos?: InputMaybe<Scalars['String']['input']>;
  workExperience?: InputMaybe<Scalars['String']['input']>;
  yearsOfExperience?: InputMaybe<Scalars['Int']['input']>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type UserPaymentAccount = {
  __typename?: 'UserPaymentAccount';
  apsyStripeAccountId?: Maybe<Scalars['String']['output']>;
  createdDate: Scalars['DateTime']['output'];
  defaultPaymentMethodId?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  stripeAccountId?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type UserPhotoGallery = {
  __typename?: 'UserPhotoGallery';
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  photoUrl?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type UserPhotoGalleryCollectionSegment = {
  __typename?: 'UserPhotoGalleryCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<UserPhotoGallery>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type UserPhotoGalleryConnection = {
  __typename?: 'UserPhotoGalleryConnection';
  /** A list of edges. */
  edges?: Maybe<Array<UserPhotoGalleryEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<UserPhotoGallery>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type UserPhotoGalleryEdge = {
  __typename?: 'UserPhotoGalleryEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<UserPhotoGallery>;
};

export type UserPhotoGalleryFilterInput = {
  and?: InputMaybe<Array<UserPhotoGalleryFilterInput>>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<UserPhotoGalleryFilterInput>>;
  photoUrl?: InputMaybe<StringOperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<IntOperationFilterInput>;
};

export type UserPhotoGallerySortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  photoUrl?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type UserSortInput = {
  about?: InputMaybe<SortEnumType>;
  accessFailedCount?: InputMaybe<SortEnumType>;
  age?: InputMaybe<SortEnumType>;
  city?: InputMaybe<SortEnumType>;
  communityCount?: InputMaybe<SortEnumType>;
  concurrencyStamp?: InputMaybe<SortEnumType>;
  config?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  data?: InputMaybe<SortEnumType>;
  dateOfBirth?: InputMaybe<SortEnumType>;
  displayContactInfo?: InputMaybe<SortEnumType>;
  displayGender?: InputMaybe<SortEnumType>;
  education?: InputMaybe<SortEnumType>;
  email?: InputMaybe<SortEnumType>;
  emailConfirmed?: InputMaybe<SortEnumType>;
  externalId?: InputMaybe<SortEnumType>;
  favoriteCategories?: InputMaybe<SortEnumType>;
  followeeCount?: InputMaybe<SortEnumType>;
  followerCount?: InputMaybe<SortEnumType>;
  fullName?: InputMaybe<SortEnumType>;
  gender?: InputMaybe<SortEnumType>;
  height?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  introSeen?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isPrivateAccount?: InputMaybe<SortEnumType>;
  isVerified?: InputMaybe<SortEnumType>;
  languages?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  lastSeen?: InputMaybe<SortEnumType>;
  latitude?: InputMaybe<SortEnumType>;
  liveCount?: InputMaybe<SortEnumType>;
  location?: InputMaybe<SortEnumType>;
  locationOfUser?: InputMaybe<PointSortInput>;
  lockoutEnabled?: InputMaybe<SortEnumType>;
  lockoutEnd?: InputMaybe<SortEnumType>;
  longitude?: InputMaybe<SortEnumType>;
  moneySpent?: InputMaybe<SortEnumType>;
  normalizedEmail?: InputMaybe<SortEnumType>;
  normalizedUserName?: InputMaybe<SortEnumType>;
  passwordHash?: InputMaybe<SortEnumType>;
  phoneNumber?: InputMaybe<SortEnumType>;
  phoneNumberConfirmed?: InputMaybe<SortEnumType>;
  photoUrl?: InputMaybe<SortEnumType>;
  profession?: InputMaybe<SortEnumType>;
  professionalSummary?: InputMaybe<SortEnumType>;
  rateAverage?: InputMaybe<SortEnumType>;
  ratePercent_1?: InputMaybe<SortEnumType>;
  ratePercent_2?: InputMaybe<SortEnumType>;
  ratePercent_3?: InputMaybe<SortEnumType>;
  ratePercent_4?: InputMaybe<SortEnumType>;
  ratePercent_5?: InputMaybe<SortEnumType>;
  requestCount?: InputMaybe<SortEnumType>;
  reviewCount?: InputMaybe<SortEnumType>;
  securityStamp?: InputMaybe<SortEnumType>;
  skills?: InputMaybe<SortEnumType>;
  socialLinks?: InputMaybe<SortEnumType>;
  state?: InputMaybe<SortEnumType>;
  streetAddress?: InputMaybe<SortEnumType>;
  stripeConnectAccountId?: InputMaybe<SortEnumType>;
  stripeConnectCompleted?: InputMaybe<SortEnumType>;
  timeSpent?: InputMaybe<SortEnumType>;
  twoFactorAuthenticationCode?: InputMaybe<SortEnumType>;
  twoFactorAuthenticationEnabled?: InputMaybe<SortEnumType>;
  twoFactorEnabled?: InputMaybe<SortEnumType>;
  unitNumber?: InputMaybe<SortEnumType>;
  userRole?: InputMaybe<SortEnumType>;
  userType?: InputMaybe<SortEnumType>;
  username?: InputMaybe<SortEnumType>;
  verificationErrors?: InputMaybe<SortEnumType>;
  verificationPhotos?: InputMaybe<SortEnumType>;
  wallet?: InputMaybe<SortEnumType>;
  workExperience?: InputMaybe<SortEnumType>;
  yearsOfExperience?: InputMaybe<SortEnumType>;
  zipCode?: InputMaybe<SortEnumType>;
};

export type UserSummaryDto = {
  __typename?: 'UserSummaryDto';
  onlineUserCount: Scalars['Int']['output'];
  userCount: Scalars['Int']['output'];
};

export type UserTokenDtoOfUser = {
  __typename?: 'UserTokenDtoOfUser';
  expireDate?: Maybe<Scalars['DateTime']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  refreshTokenExpiryTime?: Maybe<Scalars['DateTime']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export enum UserType {
  Owner = 'OWNER',
  User = 'USER',
}

export enum VerificationStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
}

export type VerificationStatusOperationFilterInput = {
  eq?: InputMaybe<VerificationStatus>;
  in?: InputMaybe<Array<VerificationStatus>>;
  neq?: InputMaybe<VerificationStatus>;
  nin?: InputMaybe<Array<VerificationStatus>>;
};

export type ViolationReport = {
  __typename?: 'ViolationReport';
  createdDate: Scalars['DateTime']['output'];
  data?: Maybe<Scalars['String']['output']>;
  defaultViolation?: Maybe<DefaultViolation>;
  defaultViolationId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  targetEntityId?: Maybe<Scalars['Int']['output']>;
  targetEntityName: Scalars['String']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type ViolationReportCollectionSegment = {
  __typename?: 'ViolationReportCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<ViolationReport>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type ViolationReportConnection = {
  __typename?: 'ViolationReportConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ViolationReportEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<ViolationReport>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ViolationReportEdge = {
  __typename?: 'ViolationReportEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<ViolationReport>;
};

export type ViolationReportFilterInput = {
  and?: InputMaybe<Array<ViolationReportFilterInput>>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  data?: InputMaybe<StringOperationFilterInput>;
  defaultViolation?: InputMaybe<DefaultViolationFilterInput>;
  defaultViolationId?: InputMaybe<IntOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<ViolationReportFilterInput>>;
  reason?: InputMaybe<StringOperationFilterInput>;
  targetEntityId?: InputMaybe<IntOperationFilterInput>;
  targetEntityName?: InputMaybe<StringOperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<IntOperationFilterInput>;
};

export type ViolationReportInput = {
  data?: InputMaybe<Scalars['String']['input']>;
  defaultViolationId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  targetEntityId?: InputMaybe<Scalars['Int']['input']>;
  targetEntityName?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type ViolationReportSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  data?: InputMaybe<SortEnumType>;
  defaultViolation?: InputMaybe<DefaultViolationSortInput>;
  defaultViolationId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  reason?: InputMaybe<SortEnumType>;
  targetEntityId?: InputMaybe<SortEnumType>;
  targetEntityName?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type WalletHistory = {
  __typename?: 'WalletHistory';
  createdDate: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  photoUrl?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
  value: Scalars['Decimal']['output'];
};

export type WalletHistoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  photoUrl?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['Int']['input'];
  value: Scalars['Decimal']['input'];
};

export type Agora_CreateTokenMutationVariables = Exact<{
  channelName?: InputMaybe<Scalars['String']['input']>;
  publisher: Scalars['Boolean']['input'];
}>;

export type Agora_CreateTokenMutation = {
  __typename?: 'Mutation';
  agora_createToken?: {
    __typename?: 'ResponseBaseOfString';
    result?: string | null;
    status?: any | null;
  } | null;
};

export type Agora_StopRecordMutationVariables = Exact<{
  channelName?: InputMaybe<Scalars['String']['input']>;
}>;

export type Agora_StopRecordMutation = {
  __typename?: 'Mutation';
  agora_stopRecord?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
    description?: string | null;
  } | null;
};

export type Agora_GetAppIdQueryVariables = Exact<{[key: string]: never}>;

export type Agora_GetAppIdQuery = {
  __typename?: 'Query';
  agora_getAppId?: {
    __typename?: 'ResponseBaseOfString';
    result?: string | null;
    status?: any | null;
  } | null;
};

export type Agora_GetRecordFilesQueryVariables = Exact<{
  liveId?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RecordFileDtoFilterInput>;
  order?: InputMaybe<Array<RecordFileDtoSortInput> | RecordFileDtoSortInput>;
}>;

export type Agora_GetRecordFilesQuery = {
  __typename?: 'Query';
  agora_getRecordFiles?: {
    __typename?: 'ListResponseBaseOfRecordFileDto';
    status?: any | null;
    result?: {
      __typename?: 'RecordFileDtoCollectionSegment';
      totalCount: number;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
      items?: Array<{
        __typename?: 'RecordFileDto';
        name?: string | null;
      } | null> | null;
    } | null;
  } | null;
};

export type Category_GetCategoriesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CategoryFilterInput>;
  order?: InputMaybe<Array<CategorySortInput> | CategorySortInput>;
}>;

export type Category_GetCategoriesQuery = {
  __typename?: 'Query';
  category_getCategories: {
    __typename?: 'ListResponseBaseOfCategory';
    status?: any | null;
    result?: {
      __typename?: 'CategoryCollectionSegment';
      totalCount: number;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
      items?: Array<{
        __typename?: 'Category';
        parentId?: number | null;
        title?: string | null;
        group?: string | null;
        createdByGamma: boolean;
        imageUrl?: string | null;
        priority: number;
        tags?: string | null;
        userId?: number | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
        lastModifiedDate?: any | null;
      } | null> | null;
    } | null;
  };
};

export type Category_GetCategoryQueryVariables = Exact<{
  entityId: Scalars['Int']['input'];
}>;

export type Category_GetCategoryQuery = {
  __typename?: 'Query';
  category_getCategory: {
    __typename?: 'SingleResponseBaseOfCategory';
    status?: any | null;
    result?: {
      __typename?: 'Category';
      parentId?: number | null;
      title?: string | null;
      group?: string | null;
      createdByGamma: boolean;
      imageUrl?: string | null;
      priority: number;
      tags?: string | null;
      userId?: number | null;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      lastModifiedDate?: any | null;
    } | null;
  };
};

export type Community_GetCommunitiesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CommunityFilterInput>;
  order?: InputMaybe<Array<CommunitySortInput> | CommunitySortInput>;
}>;

export type Community_GetCommunitiesQuery = {
  __typename?: 'Query';
  community_getCommunities?: {
    __typename?: 'ListResponseBaseOfCommunity';
    status?: any | null;
    result?: {
      __typename?: 'CommunityCollectionSegment';
      totalCount: number;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
      items?: Array<{
        __typename?: 'Community';
        communityType: CommunityType;
        createdDate: any;
        description?: string | null;
        id: number;
        requestCount: number;
        title?: string | null;
        creator?: {
          __typename?: 'User';
          about?: string | null;
          fullName?: string | null;
          photoUrl?: string | null;
        } | null;
      } | null> | null;
    } | null;
  } | null;
};

export type Community_GetOtherCommunitiesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CommunityFilterInput>;
  order?: InputMaybe<Array<CommunitySortInput> | CommunitySortInput>;
}>;

export type Community_GetOtherCommunitiesQuery = {
  __typename?: 'Query';
  community_getOtherCommunities?: {
    __typename?: 'ListResponseBaseOfCommunity';
    status?: any | null;
    result?: {
      __typename?: 'CommunityCollectionSegment';
      totalCount: number;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
      items?: Array<{
        __typename?: 'Community';
        communityType: CommunityType;
        createdDate: any;
        description?: string | null;
        id: number;
        requestCount: number;
        title?: string | null;
        creator?: {
          __typename?: 'User';
          about?: string | null;
          fullName?: string | null;
          photoUrl?: string | null;
        } | null;
      } | null> | null;
    } | null;
  } | null;
};

export type Live_AddToBookmarkMutationVariables = Exact<{
  liveId: Scalars['Int']['input'];
}>;

export type Live_AddToBookmarkMutation = {
  __typename?: 'Mutation';
  live_addToBookmark?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
    description?: string | null;
  } | null;
};

export type Live_RemoveFromBookmarkMutationVariables = Exact<{
  liveId: Scalars['Int']['input'];
}>;

export type Live_RemoveFromBookmarkMutation = {
  __typename?: 'Mutation';
  live_removeFromBookmark?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
    description?: string | null;
  } | null;
};

export type Live_CreateNotInterestedMutationVariables = Exact<{
  liveId: Scalars['Int']['input'];
}>;

export type Live_CreateNotInterestedMutation = {
  __typename?: 'Mutation';
  live_createNotInterested?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
    description?: string | null;
  } | null;
};

export type Live_CreateLiveMutationVariables = Exact<{
  input?: InputMaybe<LiveInput>;
}>;

export type Live_CreateLiveMutation = {
  __typename?: 'Mutation';
  live_createLive?: {
    __typename?: 'ResponseBaseOfLive';
    status?: any | null;
    result?: {
      __typename?: 'Live';
      userId: number;
      liveType: LiveType;
      id: number;
    } | null;
  } | null;
};

export type Live_CreateCommentMutationVariables = Exact<{
  input?: InputMaybe<LiveCommentInput>;
}>;

export type Live_CreateCommentMutation = {
  __typename?: 'Mutation';
  live_createComment?: {
    __typename?: 'ResponseBaseOfLiveComment';
    status?: any | null;
    result?: {
      __typename?: 'LiveComment';
      liveId: number;
      userId: number;
      parentId?: number | null;
      text?: string | null;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      lastModifiedDate?: any | null;
      live?: {
        __typename?: 'Live';
        category?: string | null;
        commentCount: number;
        createdDate: any;
      } | null;
      user?: {__typename?: 'User'; fullName?: string | null} | null;
      parent?: {__typename?: 'LiveComment'; id: number} | null;
      children?: Array<{__typename?: 'LiveComment'; id: number} | null> | null;
    } | null;
  } | null;
};

export type Live_DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['Int']['input'];
}>;

export type Live_DeleteCommentMutation = {
  __typename?: 'Mutation';
  live_deleteComment?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
    description?: string | null;
  } | null;
};

export type Live_ViewLiveMutationVariables = Exact<{
  liveId: Scalars['Int']['input'];
}>;

export type Live_ViewLiveMutation = {
  __typename?: 'Mutation';
  live_viewLive?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
    description?: string | null;
  } | null;
};

export type Live_LikeMutationVariables = Exact<{
  liveId: Scalars['Int']['input'];
}>;

export type Live_LikeMutation = {
  __typename?: 'Mutation';
  live_like?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
    description?: string | null;
  } | null;
};

export type Live_DeleteLiveMutationVariables = Exact<{
  liveId: Scalars['Int']['input'];
}>;

export type Live_DeleteLiveMutation = {
  __typename?: 'Mutation';
  live_deleteLive?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
    description?: string | null;
  } | null;
};

export type Live_UpdateLiveMutationVariables = Exact<{
  input?: InputMaybe<LiveInput>;
}>;

export type Live_UpdateLiveMutation = {
  __typename?: 'Mutation';
  live_updateLive?: {
    __typename?: 'ResponseBaseOfLive';
    status?: any | null;
    result?: {__typename?: 'Live'; userId: number; id: number} | null;
  } | null;
};

export type Live_GetLivesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LiveDtoFilterInput>;
  order?: InputMaybe<Array<LiveDtoSortInput> | LiveDtoSortInput>;
}>;

export type Live_GetLivesQuery = {
  __typename?: 'Query';
  live_getLives?: {
    __typename?: 'ListResponseBaseOfLiveDto';
    status?: any | null;
    result?: {
      __typename?: 'LiveDtoCollectionSegment';
      totalCount: number;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
      items?: Array<{
        __typename?: 'LiveDto';
        isViewed: boolean;
        isBookmark: boolean;
        isPurchased: boolean;
        isFollowed: boolean;
        isLiked: boolean;
        recordStarted: boolean;
        recordEnded: boolean;
        live?: {
          __typename?: 'Live';
          id: number;
          likeCount: number;
          userId: number;
          introUrl?: string | null;
          liveType: LiveType;
          photoUrl?: string | null;
          title?: string | null;
          description?: string | null;
          proposalTitle?: string | null;
          proposalCategory?: string | null;
          proposalSummary?: string | null;
          isDraft: boolean;
          category?: string | null;
          price: any;
          recordUrl?: string | null;
          isFree: boolean;
          previewUrl?: string | null;
          value: any;
          funding: number;
          setSchedule: boolean;
          publishingScheduleDate?: any | null;
          publishingScheduleTime?: any | null;
          viewCount: number;
          purchaseCount: number;
          agoraUserId?: string | null;
          user?: {
            __typename?: 'User';
            username?: string | null;
            phoneNumber?: string | null;
            photoUrl?: string | null;
            fullName?: string | null;
            about?: string | null;
            gender?: Gender | null;
            lastSeen?: any | null;
            isVerified: boolean;
            isDeleted: boolean;
            createdDate?: any | null;
            id: number;
            email?: string | null;
            emailConfirmed: boolean;
            phoneNumberConfirmed: boolean;
          } | null;
        } | null;
      } | null> | null;
    } | null;
  } | null;
};

export type Live_GetLiveStreamsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LiveDtoFilterInput>;
  order?: InputMaybe<Array<LiveDtoSortInput> | LiveDtoSortInput>;
}>;

export type Live_GetLiveStreamsQuery = {
  __typename?: 'Query';
  live_getLiveStreams?: {
    __typename?: 'ListResponseBaseOfLiveDto';
    status?: any | null;
    result?: {
      __typename?: 'LiveDtoCollectionSegment';
      totalCount: number;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
      items?: Array<{
        __typename?: 'LiveDto';
        isBookmark: boolean;
        isPurchased: boolean;
        isViewed: boolean;
        isFollowed: boolean;
        recordEnded: boolean;
        recordStarted: boolean;
        live?: {
          __typename?: 'Live';
          id: number;
          introUrl?: string | null;
          category?: string | null;
          createdDate: any;
          description?: string | null;
          photoUrl?: string | null;
          recordUrl?: string | null;
          title?: string | null;
          viewCount: number;
          user?: {
            __typename?: 'User';
            fullName?: string | null;
            photoUrl?: string | null;
            username?: string | null;
            id: number;
          } | null;
        } | null;
      } | null> | null;
    } | null;
  } | null;
};

export type Live_GetRecommendedLivesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LiveDtoFilterInput>;
  order?: InputMaybe<Array<LiveDtoSortInput> | LiveDtoSortInput>;
}>;

export type Live_GetRecommendedLivesQuery = {
  __typename?: 'Query';
  live_getRecommendedLives?: {
    __typename?: 'ListResponseBaseOfLiveDto';
    status?: any | null;
    result?: {
      __typename?: 'LiveDtoCollectionSegment';
      totalCount: number;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
      items?: Array<{
        __typename?: 'LiveDto';
        isBookmark: boolean;
        isPurchased: boolean;
        isViewed: boolean;
        recordEnded: boolean;
        recordStarted: boolean;
        live?: {
          __typename?: 'Live';
          id: number;
          introUrl?: string | null;
          category?: string | null;
          createdDate: any;
          description?: string | null;
          photoUrl?: string | null;
          recordUrl?: string | null;
          title?: string | null;
          viewCount: number;
          user?: {
            __typename?: 'User';
            photoUrl?: string | null;
            fullName?: string | null;
            username?: string | null;
            id: number;
          } | null;
        } | null;
      } | null> | null;
    } | null;
  } | null;
};

export type Live_GetTrendingLivesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LiveDtoFilterInput>;
  order?: InputMaybe<Array<LiveDtoSortInput> | LiveDtoSortInput>;
}>;

export type Live_GetTrendingLivesQuery = {
  __typename?: 'Query';
  live_getTrendingLives?: {
    __typename?: 'ListResponseBaseOfLiveDto';
    status?: any | null;
    result?: {
      __typename?: 'LiveDtoCollectionSegment';
      totalCount: number;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
      items?: Array<{
        __typename?: 'LiveDto';
        isBookmark: boolean;
        isPurchased: boolean;
        isViewed: boolean;
        recordEnded: boolean;
        recordStarted: boolean;
        live?: {
          __typename?: 'Live';
          id: number;
          introUrl?: string | null;
          category?: string | null;
          createdDate: any;
          description?: string | null;
          recordUrl?: string | null;
          liveType: LiveType;
          photoUrl?: string | null;
          title?: string | null;
          viewCount: number;
          user?: {
            __typename?: 'User';
            photoUrl?: string | null;
            fullName?: string | null;
            username?: string | null;
            id: number;
          } | null;
        } | null;
      } | null> | null;
    } | null;
  } | null;
};

export type Live_GetNewLivesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LiveDtoFilterInput>;
  order?: InputMaybe<Array<LiveDtoSortInput> | LiveDtoSortInput>;
}>;

export type Live_GetNewLivesQuery = {
  __typename?: 'Query';
  live_getNewLives?: {
    __typename?: 'ListResponseBaseOfLiveDto';
    status?: any | null;
    result?: {
      __typename?: 'LiveDtoCollectionSegment';
      totalCount: number;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
      items?: Array<{
        __typename?: 'LiveDto';
        isBookmark: boolean;
        isPurchased: boolean;
        isViewed: boolean;
        recordEnded: boolean;
        recordStarted: boolean;
        live?: {
          __typename?: 'Live';
          id: number;
          introUrl?: string | null;
          category?: string | null;
          createdDate: any;
          description?: string | null;
          photoUrl?: string | null;
          recordUrl?: string | null;
          title?: string | null;
          viewCount: number;
          user?: {
            __typename?: 'User';
            photoUrl?: string | null;
            fullName?: string | null;
            username?: string | null;
            id: number;
          } | null;
        } | null;
      } | null> | null;
    } | null;
  } | null;
};

export type Live_GetLiveCommentsQueryVariables = Exact<{
  liveId: Scalars['Int']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LiveCommentDtoFilterInput>;
  order?: InputMaybe<Array<LiveCommentDtoSortInput> | LiveCommentDtoSortInput>;
}>;

export type Live_GetLiveCommentsQuery = {
  __typename?: 'Query';
  live_getLiveComments?: {
    __typename?: 'ListResponseBaseOfLiveCommentDto';
    status?: any | null;
    result?: {
      __typename?: 'LiveCommentDtoCollectionSegment';
      totalCount: number;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
      items?: Array<{
        __typename?: 'LiveCommentDto';
        tip: any;
        comment?: {
          __typename?: 'LiveComment';
          id: number;
          text?: string | null;
          user?: {
            __typename?: 'User';
            photoUrl?: string | null;
            fullName?: string | null;
            username?: string | null;
            id: number;
          } | null;
          children?: Array<{
            __typename?: 'LiveComment';
            text?: string | null;
          } | null> | null;
        } | null;
      } | null> | null;
    } | null;
  } | null;
};

export type Live_GetLivesForHomePageQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LiveDtoFilterInput>;
  order?: InputMaybe<Array<LiveDtoSortInput> | LiveDtoSortInput>;
  category?: InputMaybe<Scalars['String']['input']>;
}>;

export type Live_GetLivesForHomePageQuery = {
  __typename?: 'Query';
  live_getLivesForHomePage?: {
    __typename?: 'ListResponseBaseOfLiveDto';
    status?: any | null;
    result?: {
      __typename?: 'LiveDtoCollectionSegment';
      totalCount: number;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
      items?: Array<{
        __typename?: 'LiveDto';
        isViewed: boolean;
        isBookmark: boolean;
        isPurchased: boolean;
        isFollowed: boolean;
        isLiked: boolean;
        recordStarted: boolean;
        recordEnded: boolean;
      } | null> | null;
    } | null;
  } | null;
};

export type Message_CreateDirectMessageMutationVariables = Exact<{
  input?: InputMaybe<MessageInput>;
  receiverId: Scalars['Int']['input'];
}>;

export type Message_CreateDirectMessageMutation = {
  __typename?: 'Mutation';
  message_createDirectMessage?: {
    __typename?: 'ResponseBaseOfMessage';
    status?: any | null;
    result?: {__typename?: 'Message'; createdAt: any; id: number} | null;
  } | null;
};

export type NotificationAddedSubscriptionVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;

export type NotificationAddedSubscription = {
  __typename?: 'Subscription';
  notificationAdded?: {
    __typename?: 'Notification';
    id: number;
    isRead: boolean;
    notificationType?: string | null;
    relatedEntity?: string | null;
    relatedEntityId?: number | null;
    relatedUserId?: number | null;
    relatedUser?: {
      __typename?: 'User';
      fullName?: string | null;
      photoUrl?: string | null;
    } | null;
  } | null;
};

export type Social_FollowUserMutationVariables = Exact<{
  input?: InputMaybe<FollowerInput>;
}>;

export type Social_FollowUserMutation = {
  __typename?: 'Mutation';
  social_followUser?: {
    __typename?: 'ResponseBaseOfFollower';
    status?: any | null;
    result?: {__typename?: 'Follower'; followerId: number; id: number} | null;
  } | null;
};

export type Social_UnfollowMutationVariables = Exact<{
  input?: InputMaybe<FollowerInput>;
}>;

export type Social_UnfollowMutation = {
  __typename?: 'Mutation';
  social_unfollow?: {__typename?: 'ResponseBase'; status?: any | null} | null;
};

export type Social_GetUserFollowerFolloweesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FollowerFolloweeDtoFilterInput>;
  order?: InputMaybe<
    Array<FollowerFolloweeDtoSortInput> | FollowerFolloweeDtoSortInput
  >;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  where1?: InputMaybe<FollowerFolloweeDtoFilterInput>;
  order1?: InputMaybe<
    Array<FollowerFolloweeDtoSortInput> | FollowerFolloweeDtoSortInput
  >;
  userId: Scalars['Int']['input'];
}>;

export type Social_GetUserFollowerFolloweesQuery = {
  __typename?: 'Query';
  social_getUserFollowerFollowees?: {
    __typename?: 'ListResponseBaseOfFollowerFolloweeDto';
    status?: any | null;
    result?: {
      __typename?: 'FollowerFolloweeDtoCollectionSegment';
      totalCount: number;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
      items?: Array<{
        __typename?: 'FollowerFolloweeDto';
        isFollower: boolean;
        followedByCurrentUser: boolean;
        followerOfCurrentUser: boolean;
        user?: {
          __typename?: 'User';
          username?: string | null;
          phoneNumber?: string | null;
          photoUrl?: string | null;
          fullName?: string | null;
          about?: string | null;
          userType?: UserType | null;
          displayGender?: boolean | null;
          displayContactInfo?: boolean | null;
          isVerified: boolean;
          id: number;
          email?: string | null;
        } | null;
      } | null> | null;
    } | null;
  } | null;
};

export type User_SignInMutationVariables = Exact<{
  input?: InputMaybe<SigninInput>;
}>;

export type User_SignInMutation = {
  __typename?: 'Mutation';
  user_signIn?: {
    __typename?: 'ResponseBaseOfUserTokenDtoOfUser';
    status?: any | null;
    result?: {
      __typename?: 'UserTokenDtoOfUser';
      token?: string | null;
      expireDate?: any | null;
      refreshToken?: string | null;
      refreshTokenExpiryTime?: any | null;
      user?: {
        __typename?: 'User';
        username?: string | null;
        phoneNumber?: string | null;
        photoUrl?: string | null;
        fullName?: string | null;
        about?: string | null;
        location?: string | null;
        age?: number | null;
        dateOfBirth?: any | null;
        gender?: Gender | null;
        lastSeen?: any | null;
        userType?: UserType | null;
        userRole?: string | null;
        isPrivateAccount: boolean;
        stripeConnectAccountId?: string | null;
        stripeConnectCompleted: boolean;
        isVerified: boolean;
        verificationPhotos?: string | null;
        verificationErrors?: string | null;
        socialLinks?: string | null;
        profession?: string | null;
        yearsOfExperience?: number | null;
        height?: number | null;
        favoriteCategories?: string | null;
        isDeleted: boolean;
        createdDate?: any | null;
        id: number;
        email?: string | null;
        emailConfirmed: boolean;
        phoneNumberConfirmed: boolean;
        twoFactorEnabled: boolean;
      } | null;
    } | null;
  } | null;
};

export type User_SignUpMutationVariables = Exact<{
  input?: InputMaybe<SignUpInput>;
  userInput?: InputMaybe<UserInput>;
}>;

export type User_SignUpMutation = {
  __typename?: 'Mutation';
  user_signUp?: {
    __typename?: 'ResponseBaseOfUser';
    status?: any | null;
    result?: {
      __typename?: 'User';
      username?: string | null;
      phoneNumber?: string | null;
      photoUrl?: string | null;
      fullName?: string | null;
      about?: string | null;
      location?: string | null;
      age?: number | null;
      dateOfBirth?: any | null;
      gender?: Gender | null;
      lastSeen?: any | null;
      userType?: UserType | null;
      userRole?: string | null;
      isPrivateAccount: boolean;
      stripeConnectAccountId?: string | null;
      stripeConnectCompleted: boolean;
      isVerified: boolean;
      verificationPhotos?: string | null;
      verificationErrors?: string | null;
      socialLinks?: string | null;
      profession?: string | null;
      yearsOfExperience?: number | null;
      height?: number | null;
      favoriteCategories?: string | null;
      isDeleted: boolean;
      createdDate?: any | null;
      id: number;
      email?: string | null;
      emailConfirmed: boolean;
      phoneNumberConfirmed: boolean;
      twoFactorEnabled: boolean;
    } | null;
  } | null;
};

export type User_UpdateUserMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']['input']>;
  userInput?: InputMaybe<UserInput>;
}>;

export type User_UpdateUserMutation = {
  __typename?: 'Mutation';
  user_updateUser?: {
    __typename?: 'ResponseBaseOfUser';
    status?: any | null;
    result?: {
      __typename?: 'User';
      username?: string | null;
      phoneNumber?: string | null;
      photoUrl?: string | null;
      fullName?: string | null;
      about?: string | null;
      location?: string | null;
      age?: number | null;
      dateOfBirth?: any | null;
      gender?: Gender | null;
      lastSeen?: any | null;
      userType?: UserType | null;
      userRole?: string | null;
      isPrivateAccount: boolean;
      stripeConnectAccountId?: string | null;
      stripeConnectCompleted: boolean;
      isVerified: boolean;
      verificationPhotos?: string | null;
      verificationErrors?: string | null;
      socialLinks?: string | null;
      profession?: string | null;
      yearsOfExperience?: number | null;
      height?: number | null;
      favoriteCategories?: string | null;
      isDeleted: boolean;
      createdDate?: any | null;
      id: number;
      email?: string | null;
      emailConfirmed: boolean;
      phoneNumberConfirmed: boolean;
      twoFactorEnabled: boolean;
    } | null;
  } | null;
};

export type User_SendVerificationCodeToEmailMutationVariables = Exact<{
  input?: InputMaybe<SendVerificationCodeToEmailInput>;
}>;

export type User_SendVerificationCodeToEmailMutation = {
  __typename?: 'Mutation';
  user_sendVerificationCodeToEmail?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
    description?: string | null;
  } | null;
};

export type User_ResetPasswordUsingEmailMutationVariables = Exact<{
  input?: InputMaybe<ResetPasswordUsingEmailInput>;
}>;

export type User_ResetPasswordUsingEmailMutation = {
  __typename?: 'Mutation';
  user_resetPasswordUsingEmail?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
    description?: string | null;
  } | null;
};

export type User_RemoveUserMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;

export type User_RemoveUserMutation = {
  __typename?: 'Mutation';
  user_removeUser?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
    description?: string | null;
  } | null;
};

export type User_GenerateTwoFactorAuthenticationCodeMutationVariables = Exact<{
  [key: string]: never;
}>;

export type User_GenerateTwoFactorAuthenticationCodeMutation = {
  __typename?: 'Mutation';
  user_generateTwoFactorAuthenticationCode?: {
    __typename?: 'ResponseBaseOfUser';
    status?: any | null;
    result?: {
      __typename?: 'User';
      username?: string | null;
      phoneNumber?: string | null;
      photoUrl?: string | null;
      fullName?: string | null;
      about?: string | null;
      location?: string | null;
      age?: number | null;
      dateOfBirth?: any | null;
      gender?: Gender | null;
      lastSeen?: any | null;
      userType?: UserType | null;
      userRole?: string | null;
      isPrivateAccount: boolean;
      stripeConnectAccountId?: string | null;
      stripeConnectCompleted: boolean;
      isVerified: boolean;
      verificationPhotos?: string | null;
      verificationErrors?: string | null;
      socialLinks?: string | null;
      profession?: string | null;
      yearsOfExperience?: number | null;
      height?: number | null;
      favoriteCategories?: string | null;
      isDeleted: boolean;
      createdDate?: any | null;
      id: number;
      email?: string | null;
      emailConfirmed: boolean;
      phoneNumberConfirmed: boolean;
      twoFactorEnabled: boolean;
    } | null;
  } | null;
};

export type User_GenerateTokenViaEmailMutationVariables = Exact<{
  input?: InputMaybe<ConfirmEmailInput>;
}>;

export type User_GenerateTokenViaEmailMutation = {
  __typename?: 'Mutation';
  user_generateTokenViaEmail?: {
    __typename?: 'ResponseBaseOfUserTokenDtoOfUser';
    status?: any | null;
    result?: {
      __typename?: 'UserTokenDtoOfUser';
      token?: string | null;
      expireDate?: any | null;
      refreshToken?: string | null;
      refreshTokenExpiryTime?: any | null;
      user?: {
        __typename?: 'User';
        username?: string | null;
        phoneNumber?: string | null;
        photoUrl?: string | null;
        fullName?: string | null;
        about?: string | null;
        location?: string | null;
        age?: number | null;
        dateOfBirth?: any | null;
        gender?: Gender | null;
        lastSeen?: any | null;
        userType?: UserType | null;
        userRole?: string | null;
        isPrivateAccount: boolean;
        stripeConnectAccountId?: string | null;
        stripeConnectCompleted: boolean;
        isVerified: boolean;
        verificationPhotos?: string | null;
        verificationErrors?: string | null;
        socialLinks?: string | null;
        profession?: string | null;
        yearsOfExperience?: number | null;
        height?: number | null;
        favoriteCategories?: string | null;
        isDeleted: boolean;
        createdDate?: any | null;
        id: number;
        email?: string | null;
        emailConfirmed: boolean;
        phoneNumberConfirmed: boolean;
        twoFactorEnabled: boolean;
      } | null;
    } | null;
  } | null;
};

export type User_CreateRequestForVerificationMutationVariables = Exact<{
  [key: string]: never;
}>;

export type User_CreateRequestForVerificationMutation = {
  __typename?: 'Mutation';
  user_createRequestForVerification?: {
    __typename?: 'ResponseBaseOfRequestForVerification';
    status?: any | null;
    result?: {
      __typename?: 'RequestForVerification';
      userId: number;
      status: VerificationStatus;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      lastModifiedDate?: any | null;
      user?: {
        __typename?: 'User';
        username?: string | null;
        phoneNumber?: string | null;
        photoUrl?: string | null;
        fullName?: string | null;
        about?: string | null;
        location?: string | null;
        age?: number | null;
        dateOfBirth?: any | null;
        gender?: Gender | null;
        lastSeen?: any | null;
        userType?: UserType | null;
        userRole?: string | null;
        isPrivateAccount: boolean;
        stripeConnectAccountId?: string | null;
        stripeConnectCompleted: boolean;
        isVerified: boolean;
        verificationPhotos?: string | null;
        verificationErrors?: string | null;
        socialLinks?: string | null;
        profession?: string | null;
        yearsOfExperience?: number | null;
        height?: number | null;
        favoriteCategories?: string | null;
        isDeleted: boolean;
        createdDate?: any | null;
        id: number;
        email?: string | null;
        emailConfirmed: boolean;
        phoneNumberConfirmed: boolean;
        twoFactorEnabled: boolean;
      } | null;
    } | null;
  } | null;
};

export type User_CheckVerificationCodeOfEmailMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
  verificationCode?: InputMaybe<Scalars['String']['input']>;
  isForResetPassword: Scalars['Boolean']['input'];
}>;

export type User_CheckVerificationCodeOfEmailMutation = {
  __typename?: 'Mutation';
  user_checkVerificationCodeOfEmail?: {
    __typename?: 'ResponseBaseOfUserTokenDtoOfUser';
    status?: any | null;
    result?: {
      __typename?: 'UserTokenDtoOfUser';
      token?: string | null;
      expireDate?: any | null;
      refreshToken?: string | null;
      refreshTokenExpiryTime?: any | null;
      user?: {
        __typename?: 'User';
        username?: string | null;
        phoneNumber?: string | null;
        photoUrl?: string | null;
        fullName?: string | null;
        about?: string | null;
        location?: string | null;
        age?: number | null;
        dateOfBirth?: any | null;
        gender?: Gender | null;
        lastSeen?: any | null;
        userType?: UserType | null;
        userRole?: string | null;
        isPrivateAccount: boolean;
        stripeConnectAccountId?: string | null;
        stripeConnectCompleted: boolean;
        isVerified: boolean;
        verificationPhotos?: string | null;
        verificationErrors?: string | null;
        socialLinks?: string | null;
        profession?: string | null;
        yearsOfExperience?: number | null;
        height?: number | null;
        favoriteCategories?: string | null;
        isDeleted: boolean;
        createdDate?: any | null;
        id: number;
        email?: string | null;
        emailConfirmed: boolean;
        phoneNumberConfirmed: boolean;
        twoFactorEnabled: boolean;
      } | null;
    } | null;
  } | null;
};

export type User_RefreshTokenMutationVariables = Exact<{
  input?: InputMaybe<TokenInput>;
}>;

export type User_RefreshTokenMutation = {
  __typename?: 'Mutation';
  user_refreshToken?: {
    __typename?: 'ResponseBaseOfUserTokenDtoOfUser';
    status?: any | null;
    result?: {
      __typename?: 'UserTokenDtoOfUser';
      token?: string | null;
      expireDate?: any | null;
      refreshToken?: string | null;
      refreshTokenExpiryTime?: any | null;
    } | null;
  } | null;
};

export type User_GetCurrentUserQueryVariables = Exact<{[key: string]: never}>;

export type User_GetCurrentUserQuery = {
  __typename?: 'Query';
  user_getCurrentUser?: {
    __typename?: 'SingleResponseBaseOfUser';
    status?: any | null;
    result?: {
      __typename?: 'User';
      username?: string | null;
      phoneNumber?: string | null;
      photoUrl?: string | null;
      fullName?: string | null;
      about?: string | null;
      location?: string | null;
      age?: number | null;
      dateOfBirth?: any | null;
      gender?: Gender | null;
      lastSeen?: any | null;
      userType?: UserType | null;
      userRole?: string | null;
      isPrivateAccount: boolean;
      stripeConnectAccountId?: string | null;
      stripeConnectCompleted: boolean;
      isVerified: boolean;
      verificationPhotos?: string | null;
      verificationErrors?: string | null;
      socialLinks?: string | null;
      profession?: string | null;
      yearsOfExperience?: number | null;
      height?: number | null;
      favoriteCategories?: string | null;
      isDeleted: boolean;
      createdDate?: any | null;
      id: number;
      email?: string | null;
      emailConfirmed: boolean;
      phoneNumberConfirmed: boolean;
      twoFactorEnabled: boolean;
    } | null;
  } | null;
};

export type User_GetUsersQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserFilterInput>;
  order?: InputMaybe<Array<UserSortInput> | UserSortInput>;
}>;

export type User_GetUsersQuery = {
  __typename?: 'Query';
  user_getUsers?: {
    __typename?: 'ListResponseBaseOfUser';
    status?: any | null;
    result?: {
      __typename?: 'UserCollectionSegment';
      totalCount: number;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
      items?: Array<{
        __typename?: 'User';
        username?: string | null;
        phoneNumber?: string | null;
        photoUrl?: string | null;
        fullName?: string | null;
        about?: string | null;
        location?: string | null;
        age?: number | null;
        dateOfBirth?: any | null;
        gender?: Gender | null;
        lastSeen?: any | null;
        userType?: UserType | null;
        userRole?: string | null;
        isPrivateAccount: boolean;
        stripeConnectAccountId?: string | null;
        stripeConnectCompleted: boolean;
        isVerified: boolean;
        verificationPhotos?: string | null;
        verificationErrors?: string | null;
        socialLinks?: string | null;
        profession?: string | null;
        yearsOfExperience?: number | null;
        height?: number | null;
        favoriteCategories?: string | null;
        isDeleted: boolean;
        createdDate?: any | null;
        id: number;
        email?: string | null;
        emailConfirmed: boolean;
        phoneNumberConfirmed: boolean;
        twoFactorEnabled: boolean;
      } | null> | null;
    } | null;
  } | null;
};

export type User_GetCastersToFollowQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserFilterInput>;
  order?: InputMaybe<Array<UserSortInput> | UserSortInput>;
}>;

export type User_GetCastersToFollowQuery = {
  __typename?: 'Query';
  user_getCastersToFollow?: {
    __typename?: 'ListResponseBaseOfUser';
    status?: any | null;
    result?: {
      __typename?: 'UserCollectionSegment';
      totalCount: number;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
      items?: Array<{
        __typename?: 'User';
        followerCount: number;
        followeeCount: number;
        username?: string | null;
        phoneNumber?: string | null;
        normalizedUserName?: string | null;
        photoUrl?: string | null;
        fullName?: string | null;
        gender?: Gender | null;
        lastSeen?: any | null;
        userType?: UserType | null;
        userRole?: string | null;
        isVerified: boolean;
        reviewCount: number;
        isDeleted: boolean;
        lastModifiedDate?: any | null;
        createdDate?: any | null;
        id: number;
        email?: string | null;
      } | null> | null;
    } | null;
  } | null;
};

export type ViolationReport_CreateViolationReportMutationVariables = Exact<{
  input: ViolationReportInput;
}>;

export type ViolationReport_CreateViolationReportMutation = {
  __typename?: 'Mutation';
  violationReport_createViolationReport: {
    __typename?: 'ResponseBaseOfViolationReport';
    status?: any | null;
    result?: {
      __typename?: 'ViolationReport';
      userId: number;
      id: number;
    } | null;
  };
};

export const Agora_CreateTokenDocument = `
    mutation agora_createToken($channelName: String, $publisher: Boolean!) {
  agora_createToken(channelName: $channelName, publisher: $publisher) {
    result
    status
  }
}
    `;

export const useAgora_CreateTokenMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    Agora_CreateTokenMutation,
    TError,
    Agora_CreateTokenMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Agora_CreateTokenMutation,
    TError,
    Agora_CreateTokenMutationVariables,
    TContext
  >(
    ['agora_createToken'],
    (variables?: Agora_CreateTokenMutationVariables) =>
      fetcher<Agora_CreateTokenMutation, Agora_CreateTokenMutationVariables>(
        Agora_CreateTokenDocument,
        variables,
      )(),
    options,
  );
};

export const Agora_StopRecordDocument = `
    mutation agora_stopRecord($channelName: String) {
  agora_stopRecord(channelName: $channelName) {
    code
    value
    description
  }
}
    `;

export const useAgora_StopRecordMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    Agora_StopRecordMutation,
    TError,
    Agora_StopRecordMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Agora_StopRecordMutation,
    TError,
    Agora_StopRecordMutationVariables,
    TContext
  >(
    ['agora_stopRecord'],
    (variables?: Agora_StopRecordMutationVariables) =>
      fetcher<Agora_StopRecordMutation, Agora_StopRecordMutationVariables>(
        Agora_StopRecordDocument,
        variables,
      )(),
    options,
  );
};

export const Agora_GetAppIdDocument = `
    query agora_getAppId {
  agora_getAppId {
    result
    status
  }
}
    `;

export const useAgora_GetAppIdQuery = <
  TData = Agora_GetAppIdQuery,
  TError = unknown,
>(
  variables?: Agora_GetAppIdQueryVariables,
  options?: UseQueryOptions<Agora_GetAppIdQuery, TError, TData>,
) => {
  return useQuery<Agora_GetAppIdQuery, TError, TData>(
    variables === undefined
      ? ['agora_getAppId']
      : ['agora_getAppId', variables],
    fetcher<Agora_GetAppIdQuery, Agora_GetAppIdQueryVariables>(
      Agora_GetAppIdDocument,
      variables,
    ),
    options,
  );
};

export const useInfiniteAgora_GetAppIdQuery = <
  TData = Agora_GetAppIdQuery,
  TError = unknown,
>(
  variables?: Agora_GetAppIdQueryVariables,
  options?: UseInfiniteQueryOptions<Agora_GetAppIdQuery, TError, TData>,
) => {
  return useInfiniteQuery<Agora_GetAppIdQuery, TError, TData>(
    variables === undefined
      ? ['agora_getAppId.infinite']
      : ['agora_getAppId.infinite', variables],
    metaData =>
      fetcher<Agora_GetAppIdQuery, Agora_GetAppIdQueryVariables>(
        Agora_GetAppIdDocument,
        {...variables, ...(metaData.pageParam ?? {})},
      )(),
    options,
  );
};

export const Agora_GetRecordFilesDocument = `
    query agora_getRecordFiles($liveId: Int, $skip: Int, $take: Int, $where: RecordFileDtoFilterInput, $order: [RecordFileDtoSortInput!]) {
  agora_getRecordFiles(liveId: $liveId) {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        name
      }
      totalCount
    }
    status
  }
}
    `;

export const useAgora_GetRecordFilesQuery = <
  TData = Agora_GetRecordFilesQuery,
  TError = unknown,
>(
  variables?: Agora_GetRecordFilesQueryVariables,
  options?: UseQueryOptions<Agora_GetRecordFilesQuery, TError, TData>,
) => {
  return useQuery<Agora_GetRecordFilesQuery, TError, TData>(
    variables === undefined
      ? ['agora_getRecordFiles']
      : ['agora_getRecordFiles', variables],
    fetcher<Agora_GetRecordFilesQuery, Agora_GetRecordFilesQueryVariables>(
      Agora_GetRecordFilesDocument,
      variables,
    ),
    options,
  );
};

export const useInfiniteAgora_GetRecordFilesQuery = <
  TData = Agora_GetRecordFilesQuery,
  TError = unknown,
>(
  variables?: Agora_GetRecordFilesQueryVariables,
  options?: UseInfiniteQueryOptions<Agora_GetRecordFilesQuery, TError, TData>,
) => {
  return useInfiniteQuery<Agora_GetRecordFilesQuery, TError, TData>(
    variables === undefined
      ? ['agora_getRecordFiles.infinite']
      : ['agora_getRecordFiles.infinite', variables],
    metaData =>
      fetcher<Agora_GetRecordFilesQuery, Agora_GetRecordFilesQueryVariables>(
        Agora_GetRecordFilesDocument,
        {...variables, ...(metaData.pageParam ?? {})},
      )(),
    options,
  );
};

export const Category_GetCategoriesDocument = `
    query category_getCategories($skip: Int, $take: Int, $where: CategoryFilterInput, $order: [CategorySortInput!]) {
  category_getCategories {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        parentId
        title
        group
        createdByGamma
        imageUrl
        priority
        tags
        userId
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      totalCount
    }
    status
  }
}
    `;

export const useCategory_GetCategoriesQuery = <
  TData = Category_GetCategoriesQuery,
  TError = unknown,
>(
  variables?: Category_GetCategoriesQueryVariables,
  options?: UseQueryOptions<Category_GetCategoriesQuery, TError, TData>,
) => {
  return useQuery<Category_GetCategoriesQuery, TError, TData>(
    variables === undefined
      ? ['category_getCategories']
      : ['category_getCategories', variables],
    fetcher<Category_GetCategoriesQuery, Category_GetCategoriesQueryVariables>(
      Category_GetCategoriesDocument,
      variables,
    ),
    options,
  );
};

export const useInfiniteCategory_GetCategoriesQuery = <
  TData = Category_GetCategoriesQuery,
  TError = unknown,
>(
  variables?: Category_GetCategoriesQueryVariables,
  options?: UseInfiniteQueryOptions<Category_GetCategoriesQuery, TError, TData>,
) => {
  return useInfiniteQuery<Category_GetCategoriesQuery, TError, TData>(
    variables === undefined
      ? ['category_getCategories.infinite']
      : ['category_getCategories.infinite', variables],
    metaData =>
      fetcher<
        Category_GetCategoriesQuery,
        Category_GetCategoriesQueryVariables
      >(Category_GetCategoriesDocument, {
        ...variables,
        ...(metaData.pageParam ?? {}),
      })(),
    options,
  );
};

export const Category_GetCategoryDocument = `
    query category_getCategory($entityId: Int!) {
  category_getCategory(entityId: $entityId) {
    result {
      parentId
      title
      group
      createdByGamma
      imageUrl
      priority
      tags
      userId
      id
      isDeleted
      createdDate
      lastModifiedDate
    }
    status
  }
}
    `;

export const useCategory_GetCategoryQuery = <
  TData = Category_GetCategoryQuery,
  TError = unknown,
>(
  variables: Category_GetCategoryQueryVariables,
  options?: UseQueryOptions<Category_GetCategoryQuery, TError, TData>,
) => {
  return useQuery<Category_GetCategoryQuery, TError, TData>(
    ['category_getCategory', variables],
    fetcher<Category_GetCategoryQuery, Category_GetCategoryQueryVariables>(
      Category_GetCategoryDocument,
      variables,
    ),
    options,
  );
};

export const useInfiniteCategory_GetCategoryQuery = <
  TData = Category_GetCategoryQuery,
  TError = unknown,
>(
  variables: Category_GetCategoryQueryVariables,
  options?: UseInfiniteQueryOptions<Category_GetCategoryQuery, TError, TData>,
) => {
  return useInfiniteQuery<Category_GetCategoryQuery, TError, TData>(
    ['category_getCategory.infinite', variables],
    metaData =>
      fetcher<Category_GetCategoryQuery, Category_GetCategoryQueryVariables>(
        Category_GetCategoryDocument,
        {...variables, ...(metaData.pageParam ?? {})},
      )(),
    options,
  );
};

export const Community_GetCommunitiesDocument = `
    query community_getCommunities($skip: Int, $take: Int, $where: CommunityFilterInput, $order: [CommunitySortInput!]) {
  community_getCommunities {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        communityType
        createdDate
        creator {
          about
          fullName
          photoUrl
        }
        description
        id
        requestCount
        title
      }
      totalCount
    }
    status
  }
}
    `;

export const useCommunity_GetCommunitiesQuery = <
  TData = Community_GetCommunitiesQuery,
  TError = unknown,
>(
  variables?: Community_GetCommunitiesQueryVariables,
  options?: UseQueryOptions<Community_GetCommunitiesQuery, TError, TData>,
) => {
  return useQuery<Community_GetCommunitiesQuery, TError, TData>(
    variables === undefined
      ? ['community_getCommunities']
      : ['community_getCommunities', variables],
    fetcher<
      Community_GetCommunitiesQuery,
      Community_GetCommunitiesQueryVariables
    >(Community_GetCommunitiesDocument, variables),
    options,
  );
};

export const useInfiniteCommunity_GetCommunitiesQuery = <
  TData = Community_GetCommunitiesQuery,
  TError = unknown,
>(
  variables?: Community_GetCommunitiesQueryVariables,
  options?: UseInfiniteQueryOptions<
    Community_GetCommunitiesQuery,
    TError,
    TData
  >,
) => {
  return useInfiniteQuery<Community_GetCommunitiesQuery, TError, TData>(
    variables === undefined
      ? ['community_getCommunities.infinite']
      : ['community_getCommunities.infinite', variables],
    metaData =>
      fetcher<
        Community_GetCommunitiesQuery,
        Community_GetCommunitiesQueryVariables
      >(Community_GetCommunitiesDocument, {
        ...variables,
        ...(metaData.pageParam ?? {}),
      })(),
    options,
  );
};

export const Community_GetOtherCommunitiesDocument = `
    query community_getOtherCommunities($skip: Int, $take: Int, $where: CommunityFilterInput, $order: [CommunitySortInput!]) {
  community_getOtherCommunities {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        communityType
        createdDate
        creator {
          about
          fullName
          photoUrl
        }
        description
        id
        requestCount
        title
      }
      totalCount
    }
    status
  }
}
    `;

export const useCommunity_GetOtherCommunitiesQuery = <
  TData = Community_GetOtherCommunitiesQuery,
  TError = unknown,
>(
  variables?: Community_GetOtherCommunitiesQueryVariables,
  options?: UseQueryOptions<Community_GetOtherCommunitiesQuery, TError, TData>,
) => {
  return useQuery<Community_GetOtherCommunitiesQuery, TError, TData>(
    variables === undefined
      ? ['community_getOtherCommunities']
      : ['community_getOtherCommunities', variables],
    fetcher<
      Community_GetOtherCommunitiesQuery,
      Community_GetOtherCommunitiesQueryVariables
    >(Community_GetOtherCommunitiesDocument, variables),
    options,
  );
};

export const useInfiniteCommunity_GetOtherCommunitiesQuery = <
  TData = Community_GetOtherCommunitiesQuery,
  TError = unknown,
>(
  variables?: Community_GetOtherCommunitiesQueryVariables,
  options?: UseInfiniteQueryOptions<
    Community_GetOtherCommunitiesQuery,
    TError,
    TData
  >,
) => {
  return useInfiniteQuery<Community_GetOtherCommunitiesQuery, TError, TData>(
    variables === undefined
      ? ['community_getOtherCommunities.infinite']
      : ['community_getOtherCommunities.infinite', variables],
    metaData =>
      fetcher<
        Community_GetOtherCommunitiesQuery,
        Community_GetOtherCommunitiesQueryVariables
      >(Community_GetOtherCommunitiesDocument, {
        ...variables,
        ...(metaData.pageParam ?? {}),
      })(),
    options,
  );
};

export const Live_AddToBookmarkDocument = `
    mutation live_addToBookmark($liveId: Int!) {
  live_addToBookmark(liveId: $liveId) {
    code
    value
    description
  }
}
    `;

export const useLive_AddToBookmarkMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    Live_AddToBookmarkMutation,
    TError,
    Live_AddToBookmarkMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Live_AddToBookmarkMutation,
    TError,
    Live_AddToBookmarkMutationVariables,
    TContext
  >(
    ['live_addToBookmark'],
    (variables?: Live_AddToBookmarkMutationVariables) =>
      fetcher<Live_AddToBookmarkMutation, Live_AddToBookmarkMutationVariables>(
        Live_AddToBookmarkDocument,
        variables,
      )(),
    options,
  );
};

export const Live_RemoveFromBookmarkDocument = `
    mutation live_removeFromBookmark($liveId: Int!) {
  live_removeFromBookmark(liveId: $liveId) {
    code
    value
    description
  }
}
    `;

export const useLive_RemoveFromBookmarkMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    Live_RemoveFromBookmarkMutation,
    TError,
    Live_RemoveFromBookmarkMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Live_RemoveFromBookmarkMutation,
    TError,
    Live_RemoveFromBookmarkMutationVariables,
    TContext
  >(
    ['live_removeFromBookmark'],
    (variables?: Live_RemoveFromBookmarkMutationVariables) =>
      fetcher<
        Live_RemoveFromBookmarkMutation,
        Live_RemoveFromBookmarkMutationVariables
      >(Live_RemoveFromBookmarkDocument, variables)(),
    options,
  );
};

export const Live_CreateNotInterestedDocument = `
    mutation live_createNotInterested($liveId: Int!) {
  live_createNotInterested(liveId: $liveId) {
    code
    value
    description
  }
}
    `;

export const useLive_CreateNotInterestedMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    Live_CreateNotInterestedMutation,
    TError,
    Live_CreateNotInterestedMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Live_CreateNotInterestedMutation,
    TError,
    Live_CreateNotInterestedMutationVariables,
    TContext
  >(
    ['live_createNotInterested'],
    (variables?: Live_CreateNotInterestedMutationVariables) =>
      fetcher<
        Live_CreateNotInterestedMutation,
        Live_CreateNotInterestedMutationVariables
      >(Live_CreateNotInterestedDocument, variables)(),
    options,
  );
};

export const Live_CreateLiveDocument = `
    mutation live_createLive($input: LiveInput) {
  live_createLive(input: $input) {
    result {
      userId
      liveType
      id
    }
    status
  }
}
    `;

export const useLive_CreateLiveMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    Live_CreateLiveMutation,
    TError,
    Live_CreateLiveMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Live_CreateLiveMutation,
    TError,
    Live_CreateLiveMutationVariables,
    TContext
  >(
    ['live_createLive'],
    (variables?: Live_CreateLiveMutationVariables) =>
      fetcher<Live_CreateLiveMutation, Live_CreateLiveMutationVariables>(
        Live_CreateLiveDocument,
        variables,
      )(),
    options,
  );
};

export const Live_CreateCommentDocument = `
    mutation live_createComment($input: LiveCommentInput) {
  live_createComment(input: $input) {
    result {
      liveId
      userId
      parentId
      text
      live {
        category
        commentCount
        createdDate
      }
      user {
        fullName
      }
      parent {
        id
      }
      children {
        id
      }
      id
      isDeleted
      createdDate
      lastModifiedDate
    }
    status
  }
}
    `;

export const useLive_CreateCommentMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    Live_CreateCommentMutation,
    TError,
    Live_CreateCommentMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Live_CreateCommentMutation,
    TError,
    Live_CreateCommentMutationVariables,
    TContext
  >(
    ['live_createComment'],
    (variables?: Live_CreateCommentMutationVariables) =>
      fetcher<Live_CreateCommentMutation, Live_CreateCommentMutationVariables>(
        Live_CreateCommentDocument,
        variables,
      )(),
    options,
  );
};

export const Live_DeleteCommentDocument = `
    mutation live_deleteComment($commentId: Int!) {
  live_deleteComment(commentId: $commentId) {
    code
    value
    description
  }
}
    `;

export const useLive_DeleteCommentMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    Live_DeleteCommentMutation,
    TError,
    Live_DeleteCommentMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Live_DeleteCommentMutation,
    TError,
    Live_DeleteCommentMutationVariables,
    TContext
  >(
    ['live_deleteComment'],
    (variables?: Live_DeleteCommentMutationVariables) =>
      fetcher<Live_DeleteCommentMutation, Live_DeleteCommentMutationVariables>(
        Live_DeleteCommentDocument,
        variables,
      )(),
    options,
  );
};

export const Live_ViewLiveDocument = `
    mutation live_viewLive($liveId: Int!) {
  live_viewLive(liveId: $liveId) {
    code
    value
    description
  }
}
    `;

export const useLive_ViewLiveMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Live_ViewLiveMutation,
    TError,
    Live_ViewLiveMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Live_ViewLiveMutation,
    TError,
    Live_ViewLiveMutationVariables,
    TContext
  >(
    ['live_viewLive'],
    (variables?: Live_ViewLiveMutationVariables) =>
      fetcher<Live_ViewLiveMutation, Live_ViewLiveMutationVariables>(
        Live_ViewLiveDocument,
        variables,
      )(),
    options,
  );
};

export const Live_LikeDocument = `
    mutation live_like($liveId: Int!) {
  live_like(liveId: $liveId) {
    code
    value
    description
  }
}
    `;

export const useLive_LikeMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Live_LikeMutation,
    TError,
    Live_LikeMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Live_LikeMutation,
    TError,
    Live_LikeMutationVariables,
    TContext
  >(
    ['live_like'],
    (variables?: Live_LikeMutationVariables) =>
      fetcher<Live_LikeMutation, Live_LikeMutationVariables>(
        Live_LikeDocument,
        variables,
      )(),
    options,
  );
};

export const Live_DeleteLiveDocument = `
    mutation live_deleteLive($liveId: Int!) {
  live_deleteLive(liveId: $liveId) {
    code
    value
    description
  }
}
    `;

export const useLive_DeleteLiveMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    Live_DeleteLiveMutation,
    TError,
    Live_DeleteLiveMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Live_DeleteLiveMutation,
    TError,
    Live_DeleteLiveMutationVariables,
    TContext
  >(
    ['live_deleteLive'],
    (variables?: Live_DeleteLiveMutationVariables) =>
      fetcher<Live_DeleteLiveMutation, Live_DeleteLiveMutationVariables>(
        Live_DeleteLiveDocument,
        variables,
      )(),
    options,
  );
};

export const Live_UpdateLiveDocument = `
    mutation live_updateLive($input: LiveInput) {
  live_updateLive(input: $input) {
    result {
      userId
      id
    }
    status
  }
}
    `;

export const useLive_UpdateLiveMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    Live_UpdateLiveMutation,
    TError,
    Live_UpdateLiveMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Live_UpdateLiveMutation,
    TError,
    Live_UpdateLiveMutationVariables,
    TContext
  >(
    ['live_updateLive'],
    (variables?: Live_UpdateLiveMutationVariables) =>
      fetcher<Live_UpdateLiveMutation, Live_UpdateLiveMutationVariables>(
        Live_UpdateLiveDocument,
        variables,
      )(),
    options,
  );
};

export const Live_GetLivesDocument = `
    query live_getLives($skip: Int, $take: Int, $where: LiveDtoFilterInput, $order: [LiveDtoSortInput!]) {
  live_getLives {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        live {
          id
          likeCount
          userId
          introUrl
          liveType
          photoUrl
          title
          description
          proposalTitle
          proposalCategory
          proposalSummary
          isDraft
          category
          price
          recordUrl
          isFree
          previewUrl
          value
          funding
          setSchedule
          publishingScheduleDate
          publishingScheduleTime
          viewCount
          purchaseCount
          agoraUserId
          user {
            username
            phoneNumber
            photoUrl
            fullName
            about
            gender
            lastSeen
            isVerified
            isDeleted
            createdDate
            id
            email
            emailConfirmed
            phoneNumberConfirmed
          }
        }
        isViewed
        isBookmark
        isPurchased
        isFollowed
        isLiked
        recordStarted
        recordEnded
      }
      totalCount
    }
    status
  }
}
    `;

export const useLive_GetLivesQuery = <
  TData = Live_GetLivesQuery,
  TError = unknown,
>(
  variables?: Live_GetLivesQueryVariables,
  options?: UseQueryOptions<Live_GetLivesQuery, TError, TData>,
) => {
  return useQuery<Live_GetLivesQuery, TError, TData>(
    variables === undefined ? ['live_getLives'] : ['live_getLives', variables],
    fetcher<Live_GetLivesQuery, Live_GetLivesQueryVariables>(
      Live_GetLivesDocument,
      variables,
    ),
    options,
  );
};

export const useInfiniteLive_GetLivesQuery = <
  TData = Live_GetLivesQuery,
  TError = unknown,
>(
  variables?: Live_GetLivesQueryVariables,
  options?: UseInfiniteQueryOptions<Live_GetLivesQuery, TError, TData>,
) => {
  return useInfiniteQuery<Live_GetLivesQuery, TError, TData>(
    variables === undefined
      ? ['live_getLives.infinite']
      : ['live_getLives.infinite', variables],
    metaData =>
      fetcher<Live_GetLivesQuery, Live_GetLivesQueryVariables>(
        Live_GetLivesDocument,
        {...variables, ...(metaData.pageParam ?? {})},
      )(),
    options,
  );
};

export const Live_GetLiveStreamsDocument = `
    query live_getLiveStreams($skip: Int, $take: Int, $where: LiveDtoFilterInput, $order: [LiveDtoSortInput!]) {
  live_getLiveStreams {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        isBookmark
        isPurchased
        isViewed
        isFollowed
        live {
          id
          introUrl
          category
          createdDate
          description
          photoUrl
          recordUrl
          title
          viewCount
          user {
            fullName
            photoUrl
            username
            id
          }
        }
        recordEnded
        recordStarted
      }
      totalCount
    }
    status
  }
}
    `;

export const useLive_GetLiveStreamsQuery = <
  TData = Live_GetLiveStreamsQuery,
  TError = unknown,
>(
  variables?: Live_GetLiveStreamsQueryVariables,
  options?: UseQueryOptions<Live_GetLiveStreamsQuery, TError, TData>,
) => {
  return useQuery<Live_GetLiveStreamsQuery, TError, TData>(
    variables === undefined
      ? ['live_getLiveStreams']
      : ['live_getLiveStreams', variables],
    fetcher<Live_GetLiveStreamsQuery, Live_GetLiveStreamsQueryVariables>(
      Live_GetLiveStreamsDocument,
      variables,
    ),
    options,
  );
};

export const useInfiniteLive_GetLiveStreamsQuery = <
  TData = Live_GetLiveStreamsQuery,
  TError = unknown,
>(
  variables?: Live_GetLiveStreamsQueryVariables,
  options?: UseInfiniteQueryOptions<Live_GetLiveStreamsQuery, TError, TData>,
) => {
  return useInfiniteQuery<Live_GetLiveStreamsQuery, TError, TData>(
    variables === undefined
      ? ['live_getLiveStreams.infinite']
      : ['live_getLiveStreams.infinite', variables],
    metaData =>
      fetcher<Live_GetLiveStreamsQuery, Live_GetLiveStreamsQueryVariables>(
        Live_GetLiveStreamsDocument,
        {...variables, ...(metaData.pageParam ?? {})},
      )(),
    options,
  );
};

export const Live_GetRecommendedLivesDocument = `
    query live_getRecommendedLives($skip: Int, $take: Int, $where: LiveDtoFilterInput, $order: [LiveDtoSortInput!]) {
  live_getRecommendedLives {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        isBookmark
        isPurchased
        isViewed
        live {
          id
          introUrl
          category
          createdDate
          description
          photoUrl
          recordUrl
          title
          viewCount
          user {
            photoUrl
            fullName
            username
            id
          }
        }
        recordEnded
        recordStarted
      }
      totalCount
    }
    status
  }
}
    `;

export const useLive_GetRecommendedLivesQuery = <
  TData = Live_GetRecommendedLivesQuery,
  TError = unknown,
>(
  variables?: Live_GetRecommendedLivesQueryVariables,
  options?: UseQueryOptions<Live_GetRecommendedLivesQuery, TError, TData>,
) => {
  return useQuery<Live_GetRecommendedLivesQuery, TError, TData>(
    variables === undefined
      ? ['live_getRecommendedLives']
      : ['live_getRecommendedLives', variables],
    fetcher<
      Live_GetRecommendedLivesQuery,
      Live_GetRecommendedLivesQueryVariables
    >(Live_GetRecommendedLivesDocument, variables),
    options,
  );
};

export const useInfiniteLive_GetRecommendedLivesQuery = <
  TData = Live_GetRecommendedLivesQuery,
  TError = unknown,
>(
  variables?: Live_GetRecommendedLivesQueryVariables,
  options?: UseInfiniteQueryOptions<
    Live_GetRecommendedLivesQuery,
    TError,
    TData
  >,
) => {
  return useInfiniteQuery<Live_GetRecommendedLivesQuery, TError, TData>(
    variables === undefined
      ? ['live_getRecommendedLives.infinite']
      : ['live_getRecommendedLives.infinite', variables],
    metaData =>
      fetcher<
        Live_GetRecommendedLivesQuery,
        Live_GetRecommendedLivesQueryVariables
      >(Live_GetRecommendedLivesDocument, {
        ...variables,
        ...(metaData.pageParam ?? {}),
      })(),
    options,
  );
};

export const Live_GetTrendingLivesDocument = `
    query live_getTrendingLives($skip: Int, $take: Int, $where: LiveDtoFilterInput, $order: [LiveDtoSortInput!]) {
  live_getTrendingLives {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        isBookmark
        isPurchased
        isViewed
        live {
          id
          introUrl
          category
          createdDate
          description
          recordUrl
          liveType
          photoUrl
          title
          viewCount
          user {
            photoUrl
            fullName
            username
            id
          }
        }
        recordEnded
        recordStarted
      }
      totalCount
    }
    status
  }
}
    `;

export const useLive_GetTrendingLivesQuery = <
  TData = Live_GetTrendingLivesQuery,
  TError = unknown,
>(
  variables?: Live_GetTrendingLivesQueryVariables,
  options?: UseQueryOptions<Live_GetTrendingLivesQuery, TError, TData>,
) => {
  return useQuery<Live_GetTrendingLivesQuery, TError, TData>(
    variables === undefined
      ? ['live_getTrendingLives']
      : ['live_getTrendingLives', variables],
    fetcher<Live_GetTrendingLivesQuery, Live_GetTrendingLivesQueryVariables>(
      Live_GetTrendingLivesDocument,
      variables,
    ),
    options,
  );
};

export const useInfiniteLive_GetTrendingLivesQuery = <
  TData = Live_GetTrendingLivesQuery,
  TError = unknown,
>(
  variables?: Live_GetTrendingLivesQueryVariables,
  options?: UseInfiniteQueryOptions<Live_GetTrendingLivesQuery, TError, TData>,
) => {
  return useInfiniteQuery<Live_GetTrendingLivesQuery, TError, TData>(
    variables === undefined
      ? ['live_getTrendingLives.infinite']
      : ['live_getTrendingLives.infinite', variables],
    metaData =>
      fetcher<Live_GetTrendingLivesQuery, Live_GetTrendingLivesQueryVariables>(
        Live_GetTrendingLivesDocument,
        {...variables, ...(metaData.pageParam ?? {})},
      )(),
    options,
  );
};

export const Live_GetNewLivesDocument = `
    query live_getNewLives($skip: Int, $take: Int, $where: LiveDtoFilterInput, $order: [LiveDtoSortInput!]) {
  live_getNewLives {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        isBookmark
        isPurchased
        isViewed
        live {
          id
          introUrl
          category
          createdDate
          description
          photoUrl
          recordUrl
          title
          viewCount
          user {
            photoUrl
            fullName
            username
            id
          }
        }
        recordEnded
        recordStarted
      }
      totalCount
    }
    status
  }
}
    `;

export const useLive_GetNewLivesQuery = <
  TData = Live_GetNewLivesQuery,
  TError = unknown,
>(
  variables?: Live_GetNewLivesQueryVariables,
  options?: UseQueryOptions<Live_GetNewLivesQuery, TError, TData>,
) => {
  return useQuery<Live_GetNewLivesQuery, TError, TData>(
    variables === undefined
      ? ['live_getNewLives']
      : ['live_getNewLives', variables],
    fetcher<Live_GetNewLivesQuery, Live_GetNewLivesQueryVariables>(
      Live_GetNewLivesDocument,
      variables,
    ),
    options,
  );
};

export const useInfiniteLive_GetNewLivesQuery = <
  TData = Live_GetNewLivesQuery,
  TError = unknown,
>(
  variables?: Live_GetNewLivesQueryVariables,
  options?: UseInfiniteQueryOptions<Live_GetNewLivesQuery, TError, TData>,
) => {
  return useInfiniteQuery<Live_GetNewLivesQuery, TError, TData>(
    variables === undefined
      ? ['live_getNewLives.infinite']
      : ['live_getNewLives.infinite', variables],
    metaData =>
      fetcher<Live_GetNewLivesQuery, Live_GetNewLivesQueryVariables>(
        Live_GetNewLivesDocument,
        {...variables, ...(metaData.pageParam ?? {})},
      )(),
    options,
  );
};

export const Live_GetLiveCommentsDocument = `
    query live_getLiveComments($liveId: Int!, $skip: Int, $take: Int, $where: LiveCommentDtoFilterInput, $order: [LiveCommentDtoSortInput!]) {
  live_getLiveComments(liveId: $liveId) {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        comment {
          id
          text
          user {
            photoUrl
            fullName
            username
            id
          }
          children {
            text
          }
        }
        tip
      }
      totalCount
    }
    status
  }
}
    `;

export const useLive_GetLiveCommentsQuery = <
  TData = Live_GetLiveCommentsQuery,
  TError = unknown,
>(
  variables: Live_GetLiveCommentsQueryVariables,
  options?: UseQueryOptions<Live_GetLiveCommentsQuery, TError, TData>,
) => {
  return useQuery<Live_GetLiveCommentsQuery, TError, TData>(
    ['live_getLiveComments', variables],
    fetcher<Live_GetLiveCommentsQuery, Live_GetLiveCommentsQueryVariables>(
      Live_GetLiveCommentsDocument,
      variables,
    ),
    options,
  );
};

export const useInfiniteLive_GetLiveCommentsQuery = <
  TData = Live_GetLiveCommentsQuery,
  TError = unknown,
>(
  variables: Live_GetLiveCommentsQueryVariables,
  options?: UseInfiniteQueryOptions<Live_GetLiveCommentsQuery, TError, TData>,
) => {
  return useInfiniteQuery<Live_GetLiveCommentsQuery, TError, TData>(
    ['live_getLiveComments.infinite', variables],
    metaData =>
      fetcher<Live_GetLiveCommentsQuery, Live_GetLiveCommentsQueryVariables>(
        Live_GetLiveCommentsDocument,
        {...variables, ...(metaData.pageParam ?? {})},
      )(),
    options,
  );
};

export const Live_GetLivesForHomePageDocument = `
    query live_getLivesForHomePage($skip: Int, $take: Int, $where: LiveDtoFilterInput, $order: [LiveDtoSortInput!], $category: String) {
  live_getLivesForHomePage(category: $category) {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        isViewed
        isBookmark
        isPurchased
        isFollowed
        isLiked
        recordStarted
        recordEnded
      }
      totalCount
    }
    status
  }
}
    `;

export const useLive_GetLivesForHomePageQuery = <
  TData = Live_GetLivesForHomePageQuery,
  TError = unknown,
>(
  variables?: Live_GetLivesForHomePageQueryVariables,
  options?: UseQueryOptions<Live_GetLivesForHomePageQuery, TError, TData>,
) => {
  return useQuery<Live_GetLivesForHomePageQuery, TError, TData>(
    variables === undefined
      ? ['live_getLivesForHomePage']
      : ['live_getLivesForHomePage', variables],
    fetcher<
      Live_GetLivesForHomePageQuery,
      Live_GetLivesForHomePageQueryVariables
    >(Live_GetLivesForHomePageDocument, variables),
    options,
  );
};

export const useInfiniteLive_GetLivesForHomePageQuery = <
  TData = Live_GetLivesForHomePageQuery,
  TError = unknown,
>(
  variables?: Live_GetLivesForHomePageQueryVariables,
  options?: UseInfiniteQueryOptions<
    Live_GetLivesForHomePageQuery,
    TError,
    TData
  >,
) => {
  return useInfiniteQuery<Live_GetLivesForHomePageQuery, TError, TData>(
    variables === undefined
      ? ['live_getLivesForHomePage.infinite']
      : ['live_getLivesForHomePage.infinite', variables],
    metaData =>
      fetcher<
        Live_GetLivesForHomePageQuery,
        Live_GetLivesForHomePageQueryVariables
      >(Live_GetLivesForHomePageDocument, {
        ...variables,
        ...(metaData.pageParam ?? {}),
      })(),
    options,
  );
};

export const Message_CreateDirectMessageDocument = `
    mutation message_createDirectMessage($input: MessageInput, $receiverId: Int!) {
  message_createDirectMessage(input: $input, receiverId: $receiverId) {
    result {
      createdAt
      id
    }
    status
  }
}
    `;

export const useMessage_CreateDirectMessageMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    Message_CreateDirectMessageMutation,
    TError,
    Message_CreateDirectMessageMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Message_CreateDirectMessageMutation,
    TError,
    Message_CreateDirectMessageMutationVariables,
    TContext
  >(
    ['message_createDirectMessage'],
    (variables?: Message_CreateDirectMessageMutationVariables) =>
      fetcher<
        Message_CreateDirectMessageMutation,
        Message_CreateDirectMessageMutationVariables
      >(Message_CreateDirectMessageDocument, variables)(),
    options,
  );
};

export const NotificationAddedDocument = `
    subscription notificationAdded($userId: Int!) {
  notificationAdded(userId: $userId) {
    id
    isRead
    notificationType
    relatedEntity
    relatedEntityId
    relatedUser {
      fullName
      photoUrl
    }
    relatedUserId
  }
}
    `;
export const Social_FollowUserDocument = `
    mutation social_followUser($input: FollowerInput) {
  social_followUser(input: $input) {
    result {
      followerId
      id
    }
    status
  }
}
    `;

export const useSocial_FollowUserMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    Social_FollowUserMutation,
    TError,
    Social_FollowUserMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Social_FollowUserMutation,
    TError,
    Social_FollowUserMutationVariables,
    TContext
  >(
    ['social_followUser'],
    (variables?: Social_FollowUserMutationVariables) =>
      fetcher<Social_FollowUserMutation, Social_FollowUserMutationVariables>(
        Social_FollowUserDocument,
        variables,
      )(),
    options,
  );
};

export const Social_UnfollowDocument = `
    mutation social_unfollow($input: FollowerInput) {
  social_unfollow(input: $input) {
    status
  }
}
    `;

export const useSocial_UnfollowMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    Social_UnfollowMutation,
    TError,
    Social_UnfollowMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Social_UnfollowMutation,
    TError,
    Social_UnfollowMutationVariables,
    TContext
  >(
    ['social_unfollow'],
    (variables?: Social_UnfollowMutationVariables) =>
      fetcher<Social_UnfollowMutation, Social_UnfollowMutationVariables>(
        Social_UnfollowDocument,
        variables,
      )(),
    options,
  );
};

export const Social_GetUserFollowerFolloweesDocument = `
    query social_getUserFollowerFollowees($skip: Int, $take: Int, $where: FollowerFolloweeDtoFilterInput, $order: [FollowerFolloweeDtoSortInput!], $first: Int, $after: String, $last: Int, $before: String, $where1: FollowerFolloweeDtoFilterInput, $order1: [FollowerFolloweeDtoSortInput!], $userId: Int!) {
  social_getUserFollowerFollowees(userId: $userId) {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        user {
          username
          phoneNumber
          photoUrl
          fullName
          about
          userType
          displayGender
          displayContactInfo
          isVerified
          id
          email
        }
        isFollower
        followedByCurrentUser
        followerOfCurrentUser
      }
      totalCount
    }
    status
  }
}
    `;

export const useSocial_GetUserFollowerFolloweesQuery = <
  TData = Social_GetUserFollowerFolloweesQuery,
  TError = unknown,
>(
  variables: Social_GetUserFollowerFolloweesQueryVariables,
  options?: UseQueryOptions<
    Social_GetUserFollowerFolloweesQuery,
    TError,
    TData
  >,
) => {
  return useQuery<Social_GetUserFollowerFolloweesQuery, TError, TData>(
    ['social_getUserFollowerFollowees', variables],
    fetcher<
      Social_GetUserFollowerFolloweesQuery,
      Social_GetUserFollowerFolloweesQueryVariables
    >(Social_GetUserFollowerFolloweesDocument, variables),
    options,
  );
};

export const useInfiniteSocial_GetUserFollowerFolloweesQuery = <
  TData = Social_GetUserFollowerFolloweesQuery,
  TError = unknown,
>(
  variables: Social_GetUserFollowerFolloweesQueryVariables,
  options?: UseInfiniteQueryOptions<
    Social_GetUserFollowerFolloweesQuery,
    TError,
    TData
  >,
) => {
  return useInfiniteQuery<Social_GetUserFollowerFolloweesQuery, TError, TData>(
    ['social_getUserFollowerFollowees.infinite', variables],
    metaData =>
      fetcher<
        Social_GetUserFollowerFolloweesQuery,
        Social_GetUserFollowerFolloweesQueryVariables
      >(Social_GetUserFollowerFolloweesDocument, {
        ...variables,
        ...(metaData.pageParam ?? {}),
      })(),
    options,
  );
};

export const User_SignInDocument = `
    mutation user_signIn($input: SigninInput) {
  user_signIn(input: $input) {
    result {
      token
      expireDate
      refreshToken
      refreshTokenExpiryTime
      user {
        username
        phoneNumber
        photoUrl
        fullName
        about
        location
        age
        dateOfBirth
        gender
        lastSeen
        userType
        userRole
        isPrivateAccount
        stripeConnectAccountId
        stripeConnectCompleted
        isVerified
        verificationPhotos
        verificationErrors
        socialLinks
        profession
        yearsOfExperience
        height
        favoriteCategories
        isDeleted
        createdDate
        id
        email
        emailConfirmed
        phoneNumberConfirmed
        twoFactorEnabled
      }
    }
    status
  }
}
    `;

export const useUser_SignInMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    User_SignInMutation,
    TError,
    User_SignInMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    User_SignInMutation,
    TError,
    User_SignInMutationVariables,
    TContext
  >(
    ['user_signIn'],
    (variables?: User_SignInMutationVariables) =>
      fetcher<User_SignInMutation, User_SignInMutationVariables>(
        User_SignInDocument,
        variables,
      )(),
    options,
  );
};

export const User_SignUpDocument = `
    mutation user_signUp($input: SignUpInput, $userInput: UserInput) {
  user_signUp(input: $input, userInput: $userInput) {
    result {
      username
      phoneNumber
      photoUrl
      fullName
      about
      location
      age
      dateOfBirth
      gender
      lastSeen
      userType
      userRole
      isPrivateAccount
      stripeConnectAccountId
      stripeConnectCompleted
      isVerified
      verificationPhotos
      verificationErrors
      socialLinks
      profession
      yearsOfExperience
      height
      favoriteCategories
      isDeleted
      createdDate
      id
      email
      emailConfirmed
      phoneNumberConfirmed
      twoFactorEnabled
    }
    status
  }
}
    `;

export const useUser_SignUpMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    User_SignUpMutation,
    TError,
    User_SignUpMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    User_SignUpMutation,
    TError,
    User_SignUpMutationVariables,
    TContext
  >(
    ['user_signUp'],
    (variables?: User_SignUpMutationVariables) =>
      fetcher<User_SignUpMutation, User_SignUpMutationVariables>(
        User_SignUpDocument,
        variables,
      )(),
    options,
  );
};

export const User_UpdateUserDocument = `
    mutation user_updateUser($userId: Int, $userInput: UserInput) {
  user_updateUser(userId: $userId, userInput: $userInput) {
    result {
      username
      phoneNumber
      photoUrl
      fullName
      about
      location
      age
      dateOfBirth
      gender
      lastSeen
      userType
      userRole
      isPrivateAccount
      stripeConnectAccountId
      stripeConnectCompleted
      isVerified
      verificationPhotos
      verificationErrors
      socialLinks
      profession
      yearsOfExperience
      height
      favoriteCategories
      isDeleted
      createdDate
      id
      email
      emailConfirmed
      phoneNumberConfirmed
      twoFactorEnabled
    }
    status
  }
}
    `;

export const useUser_UpdateUserMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    User_UpdateUserMutation,
    TError,
    User_UpdateUserMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    User_UpdateUserMutation,
    TError,
    User_UpdateUserMutationVariables,
    TContext
  >(
    ['user_updateUser'],
    (variables?: User_UpdateUserMutationVariables) =>
      fetcher<User_UpdateUserMutation, User_UpdateUserMutationVariables>(
        User_UpdateUserDocument,
        variables,
      )(),
    options,
  );
};

export const User_SendVerificationCodeToEmailDocument = `
    mutation user_sendVerificationCodeToEmail($input: SendVerificationCodeToEmailInput) {
  user_sendVerificationCodeToEmail(input: $input) {
    code
    value
    description
  }
}
    `;

export const useUser_SendVerificationCodeToEmailMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    User_SendVerificationCodeToEmailMutation,
    TError,
    User_SendVerificationCodeToEmailMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    User_SendVerificationCodeToEmailMutation,
    TError,
    User_SendVerificationCodeToEmailMutationVariables,
    TContext
  >(
    ['user_sendVerificationCodeToEmail'],
    (variables?: User_SendVerificationCodeToEmailMutationVariables) =>
      fetcher<
        User_SendVerificationCodeToEmailMutation,
        User_SendVerificationCodeToEmailMutationVariables
      >(User_SendVerificationCodeToEmailDocument, variables)(),
    options,
  );
};

export const User_ResetPasswordUsingEmailDocument = `
    mutation user_resetPasswordUsingEmail($input: ResetPasswordUsingEmailInput) {
  user_resetPasswordUsingEmail(input: $input) {
    code
    value
    description
  }
}
    `;

export const useUser_ResetPasswordUsingEmailMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    User_ResetPasswordUsingEmailMutation,
    TError,
    User_ResetPasswordUsingEmailMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    User_ResetPasswordUsingEmailMutation,
    TError,
    User_ResetPasswordUsingEmailMutationVariables,
    TContext
  >(
    ['user_resetPasswordUsingEmail'],
    (variables?: User_ResetPasswordUsingEmailMutationVariables) =>
      fetcher<
        User_ResetPasswordUsingEmailMutation,
        User_ResetPasswordUsingEmailMutationVariables
      >(User_ResetPasswordUsingEmailDocument, variables)(),
    options,
  );
};

export const User_RemoveUserDocument = `
    mutation user_removeUser($userId: Int) {
  user_removeUser(userId: $userId) {
    code
    value
    description
  }
}
    `;

export const useUser_RemoveUserMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    User_RemoveUserMutation,
    TError,
    User_RemoveUserMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    User_RemoveUserMutation,
    TError,
    User_RemoveUserMutationVariables,
    TContext
  >(
    ['user_removeUser'],
    (variables?: User_RemoveUserMutationVariables) =>
      fetcher<User_RemoveUserMutation, User_RemoveUserMutationVariables>(
        User_RemoveUserDocument,
        variables,
      )(),
    options,
  );
};

export const User_GenerateTwoFactorAuthenticationCodeDocument = `
    mutation user_generateTwoFactorAuthenticationCode {
  user_generateTwoFactorAuthenticationCode {
    result {
      username
      phoneNumber
      photoUrl
      fullName
      about
      location
      age
      dateOfBirth
      gender
      lastSeen
      userType
      userRole
      isPrivateAccount
      stripeConnectAccountId
      stripeConnectCompleted
      isVerified
      verificationPhotos
      verificationErrors
      socialLinks
      profession
      yearsOfExperience
      height
      favoriteCategories
      isDeleted
      createdDate
      id
      email
      emailConfirmed
      phoneNumberConfirmed
      twoFactorEnabled
    }
    status
  }
}
    `;

export const useUser_GenerateTwoFactorAuthenticationCodeMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    User_GenerateTwoFactorAuthenticationCodeMutation,
    TError,
    User_GenerateTwoFactorAuthenticationCodeMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    User_GenerateTwoFactorAuthenticationCodeMutation,
    TError,
    User_GenerateTwoFactorAuthenticationCodeMutationVariables,
    TContext
  >(
    ['user_generateTwoFactorAuthenticationCode'],
    (variables?: User_GenerateTwoFactorAuthenticationCodeMutationVariables) =>
      fetcher<
        User_GenerateTwoFactorAuthenticationCodeMutation,
        User_GenerateTwoFactorAuthenticationCodeMutationVariables
      >(User_GenerateTwoFactorAuthenticationCodeDocument, variables)(),
    options,
  );
};

export const User_GenerateTokenViaEmailDocument = `
    mutation user_generateTokenViaEmail($input: ConfirmEmailInput) {
  user_generateTokenViaEmail(input: $input) {
    result {
      token
      expireDate
      refreshToken
      refreshTokenExpiryTime
      user {
        username
        phoneNumber
        photoUrl
        fullName
        about
        location
        age
        dateOfBirth
        gender
        lastSeen
        userType
        userRole
        isPrivateAccount
        stripeConnectAccountId
        stripeConnectCompleted
        isVerified
        verificationPhotos
        verificationErrors
        socialLinks
        profession
        yearsOfExperience
        height
        favoriteCategories
        isDeleted
        createdDate
        id
        email
        emailConfirmed
        phoneNumberConfirmed
        twoFactorEnabled
      }
    }
    status
  }
}
    `;

export const useUser_GenerateTokenViaEmailMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    User_GenerateTokenViaEmailMutation,
    TError,
    User_GenerateTokenViaEmailMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    User_GenerateTokenViaEmailMutation,
    TError,
    User_GenerateTokenViaEmailMutationVariables,
    TContext
  >(
    ['user_generateTokenViaEmail'],
    (variables?: User_GenerateTokenViaEmailMutationVariables) =>
      fetcher<
        User_GenerateTokenViaEmailMutation,
        User_GenerateTokenViaEmailMutationVariables
      >(User_GenerateTokenViaEmailDocument, variables)(),
    options,
  );
};

export const User_CreateRequestForVerificationDocument = `
    mutation user_createRequestForVerification {
  user_createRequestForVerification {
    result {
      userId
      user {
        username
        phoneNumber
        photoUrl
        fullName
        about
        location
        age
        dateOfBirth
        gender
        lastSeen
        userType
        userRole
        isPrivateAccount
        stripeConnectAccountId
        stripeConnectCompleted
        isVerified
        verificationPhotos
        verificationErrors
        socialLinks
        profession
        yearsOfExperience
        height
        favoriteCategories
        isDeleted
        createdDate
        id
        email
        emailConfirmed
        phoneNumberConfirmed
        twoFactorEnabled
      }
      status
      id
      isDeleted
      createdDate
      lastModifiedDate
    }
    status
  }
}
    `;

export const useUser_CreateRequestForVerificationMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    User_CreateRequestForVerificationMutation,
    TError,
    User_CreateRequestForVerificationMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    User_CreateRequestForVerificationMutation,
    TError,
    User_CreateRequestForVerificationMutationVariables,
    TContext
  >(
    ['user_createRequestForVerification'],
    (variables?: User_CreateRequestForVerificationMutationVariables) =>
      fetcher<
        User_CreateRequestForVerificationMutation,
        User_CreateRequestForVerificationMutationVariables
      >(User_CreateRequestForVerificationDocument, variables)(),
    options,
  );
};

export const User_CheckVerificationCodeOfEmailDocument = `
    mutation user_checkVerificationCodeOfEmail($email: String, $verificationCode: String, $isForResetPassword: Boolean!) {
  user_checkVerificationCodeOfEmail(
    email: $email
    verificationCode: $verificationCode
    isForResetPassword: $isForResetPassword
  ) {
    result {
      token
      expireDate
      refreshToken
      refreshTokenExpiryTime
      user {
        username
        phoneNumber
        photoUrl
        fullName
        about
        location
        age
        dateOfBirth
        gender
        lastSeen
        userType
        userRole
        isPrivateAccount
        stripeConnectAccountId
        stripeConnectCompleted
        isVerified
        verificationPhotos
        verificationErrors
        socialLinks
        profession
        yearsOfExperience
        height
        favoriteCategories
        isDeleted
        createdDate
        id
        email
        emailConfirmed
        phoneNumberConfirmed
        twoFactorEnabled
      }
    }
    status
  }
}
    `;

export const useUser_CheckVerificationCodeOfEmailMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    User_CheckVerificationCodeOfEmailMutation,
    TError,
    User_CheckVerificationCodeOfEmailMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    User_CheckVerificationCodeOfEmailMutation,
    TError,
    User_CheckVerificationCodeOfEmailMutationVariables,
    TContext
  >(
    ['user_checkVerificationCodeOfEmail'],
    (variables?: User_CheckVerificationCodeOfEmailMutationVariables) =>
      fetcher<
        User_CheckVerificationCodeOfEmailMutation,
        User_CheckVerificationCodeOfEmailMutationVariables
      >(User_CheckVerificationCodeOfEmailDocument, variables)(),
    options,
  );
};

export const User_RefreshTokenDocument = `
    mutation user_refreshToken($input: TokenInput) {
  user_refreshToken(input: $input) {
    result {
      token
      expireDate
      refreshToken
      refreshTokenExpiryTime
    }
    status
  }
}
    `;

export const useUser_RefreshTokenMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    User_RefreshTokenMutation,
    TError,
    User_RefreshTokenMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    User_RefreshTokenMutation,
    TError,
    User_RefreshTokenMutationVariables,
    TContext
  >(
    ['user_refreshToken'],
    (variables?: User_RefreshTokenMutationVariables) =>
      fetcher<User_RefreshTokenMutation, User_RefreshTokenMutationVariables>(
        User_RefreshTokenDocument,
        variables,
      )(),
    options,
  );
};

export const User_GetCurrentUserDocument = `
    query user_getCurrentUser {
  user_getCurrentUser {
    result {
      username
      phoneNumber
      photoUrl
      fullName
      about
      location
      age
      dateOfBirth
      gender
      lastSeen
      userType
      userRole
      isPrivateAccount
      stripeConnectAccountId
      stripeConnectCompleted
      isVerified
      verificationPhotos
      verificationErrors
      socialLinks
      profession
      yearsOfExperience
      height
      favoriteCategories
      isDeleted
      createdDate
      id
      email
      emailConfirmed
      phoneNumberConfirmed
      twoFactorEnabled
    }
    status
  }
}
    `;

export const useUser_GetCurrentUserQuery = <
  TData = User_GetCurrentUserQuery,
  TError = unknown,
>(
  variables?: User_GetCurrentUserQueryVariables,
  options?: UseQueryOptions<User_GetCurrentUserQuery, TError, TData>,
) => {
  return useQuery<User_GetCurrentUserQuery, TError, TData>(
    variables === undefined
      ? ['user_getCurrentUser']
      : ['user_getCurrentUser', variables],
    fetcher<User_GetCurrentUserQuery, User_GetCurrentUserQueryVariables>(
      User_GetCurrentUserDocument,
      variables,
    ),
    options,
  );
};

export const useInfiniteUser_GetCurrentUserQuery = <
  TData = User_GetCurrentUserQuery,
  TError = unknown,
>(
  variables?: User_GetCurrentUserQueryVariables,
  options?: UseInfiniteQueryOptions<User_GetCurrentUserQuery, TError, TData>,
) => {
  return useInfiniteQuery<User_GetCurrentUserQuery, TError, TData>(
    variables === undefined
      ? ['user_getCurrentUser.infinite']
      : ['user_getCurrentUser.infinite', variables],
    metaData =>
      fetcher<User_GetCurrentUserQuery, User_GetCurrentUserQueryVariables>(
        User_GetCurrentUserDocument,
        {...variables, ...(metaData.pageParam ?? {})},
      )(),
    options,
  );
};

export const User_GetUsersDocument = `
    query user_getUsers($skip: Int, $take: Int, $where: UserFilterInput, $order: [UserSortInput!]) {
  user_getUsers {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        username
        phoneNumber
        photoUrl
        fullName
        about
        location
        age
        dateOfBirth
        gender
        lastSeen
        userType
        userRole
        isPrivateAccount
        stripeConnectAccountId
        stripeConnectCompleted
        isVerified
        verificationPhotos
        verificationErrors
        socialLinks
        profession
        yearsOfExperience
        height
        favoriteCategories
        isDeleted
        createdDate
        id
        email
        emailConfirmed
        phoneNumberConfirmed
        twoFactorEnabled
      }
      totalCount
    }
    status
  }
}
    `;

export const useUser_GetUsersQuery = <
  TData = User_GetUsersQuery,
  TError = unknown,
>(
  variables?: User_GetUsersQueryVariables,
  options?: UseQueryOptions<User_GetUsersQuery, TError, TData>,
) => {
  return useQuery<User_GetUsersQuery, TError, TData>(
    variables === undefined ? ['user_getUsers'] : ['user_getUsers', variables],
    fetcher<User_GetUsersQuery, User_GetUsersQueryVariables>(
      User_GetUsersDocument,
      variables,
    ),
    options,
  );
};

export const useInfiniteUser_GetUsersQuery = <
  TData = User_GetUsersQuery,
  TError = unknown,
>(
  variables?: User_GetUsersQueryVariables,
  options?: UseInfiniteQueryOptions<User_GetUsersQuery, TError, TData>,
) => {
  return useInfiniteQuery<User_GetUsersQuery, TError, TData>(
    variables === undefined
      ? ['user_getUsers.infinite']
      : ['user_getUsers.infinite', variables],
    metaData =>
      fetcher<User_GetUsersQuery, User_GetUsersQueryVariables>(
        User_GetUsersDocument,
        {...variables, ...(metaData.pageParam ?? {})},
      )(),
    options,
  );
};

export const User_GetCastersToFollowDocument = `
    query user_getCastersToFollow($skip: Int, $take: Int, $where: UserFilterInput, $order: [UserSortInput!]) {
  user_getCastersToFollow {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        followerCount
        followeeCount
        username
        phoneNumber
        normalizedUserName
        photoUrl
        fullName
        gender
        lastSeen
        userType
        userRole
        isVerified
        reviewCount
        isDeleted
        lastModifiedDate
        createdDate
        id
        email
      }
      totalCount
    }
    status
  }
}
    `;

export const useUser_GetCastersToFollowQuery = <
  TData = User_GetCastersToFollowQuery,
  TError = unknown,
>(
  variables?: User_GetCastersToFollowQueryVariables,
  options?: UseQueryOptions<User_GetCastersToFollowQuery, TError, TData>,
) => {
  return useQuery<User_GetCastersToFollowQuery, TError, TData>(
    variables === undefined
      ? ['user_getCastersToFollow']
      : ['user_getCastersToFollow', variables],
    fetcher<
      User_GetCastersToFollowQuery,
      User_GetCastersToFollowQueryVariables
    >(User_GetCastersToFollowDocument, variables),
    options,
  );
};

export const useInfiniteUser_GetCastersToFollowQuery = <
  TData = User_GetCastersToFollowQuery,
  TError = unknown,
>(
  variables?: User_GetCastersToFollowQueryVariables,
  options?: UseInfiniteQueryOptions<
    User_GetCastersToFollowQuery,
    TError,
    TData
  >,
) => {
  return useInfiniteQuery<User_GetCastersToFollowQuery, TError, TData>(
    variables === undefined
      ? ['user_getCastersToFollow.infinite']
      : ['user_getCastersToFollow.infinite', variables],
    metaData =>
      fetcher<
        User_GetCastersToFollowQuery,
        User_GetCastersToFollowQueryVariables
      >(User_GetCastersToFollowDocument, {
        ...variables,
        ...(metaData.pageParam ?? {}),
      })(),
    options,
  );
};

export const ViolationReport_CreateViolationReportDocument = `
    mutation violationReport_createViolationReport($input: ViolationReportInput!) {
  violationReport_createViolationReport(input: $input) {
    result {
      userId
      id
    }
    status
  }
}
    `;

export const useViolationReport_CreateViolationReportMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    ViolationReport_CreateViolationReportMutation,
    TError,
    ViolationReport_CreateViolationReportMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    ViolationReport_CreateViolationReportMutation,
    TError,
    ViolationReport_CreateViolationReportMutationVariables,
    TContext
  >(
    ['violationReport_createViolationReport'],
    (variables?: ViolationReport_CreateViolationReportMutationVariables) =>
      fetcher<
        ViolationReport_CreateViolationReportMutation,
        ViolationReport_CreateViolationReportMutationVariables
      >(ViolationReport_CreateViolationReportDocument, variables)(),
    options,
  );
};
