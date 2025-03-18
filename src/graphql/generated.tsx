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
  Geometry: {input: any; output: any};
  Position: {input: any; output: any};
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION',
}

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ChangePassowrdInput = {
  newPassword?: InputMaybe<Scalars['String']['input']>;
  oldPassword?: InputMaybe<Scalars['String']['input']>;
};

/** Information about the offset pagination. */
export type CollectionSegmentInfo = {
  __typename?: 'CollectionSegmentInfo';
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
};

export type ConfirmEmailInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  tokenConfirmationCode?: InputMaybe<Scalars['String']['input']>;
};

export type ConfirmPhoneNumberInput = {
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  verificationCode?: InputMaybe<Scalars['String']['input']>;
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

export type Mutation = {
  __typename?: 'Mutation';
  agora_createToken?: Maybe<ResponseBaseOfString>;
  user_addPhoto?: Maybe<ResponseBaseOfUserPhotoGallery>;
  user_addPhotos?: Maybe<ListResponseBaseOfUserPhotoGallery>;
  user_changeUserPassowrd?: Maybe<ResponseStatus>;
  user_confirmPhoneNumber?: Maybe<ResponseStatus>;
  user_createLoginActivity?: Maybe<ResponseBaseOfLoginActivity>;
  user_createRequestForVerification?: Maybe<ResponseBaseOfRequestForVerification>;
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
};

export type MutationAgora_CreateTokenArgs = {
  channelName?: InputMaybe<Scalars['String']['input']>;
  publisher: Scalars['Boolean']['input'];
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

export type MutationUser_ConfirmPhoneNumberArgs = {
  input?: InputMaybe<ConfirmPhoneNumberInput>;
};

export type MutationUser_CreateLoginActivityArgs = {
  input?: InputMaybe<LoginActivityInput>;
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
  input?: InputMaybe<SignInInput>;
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
  user_doesEmailExist?: Maybe<ResponseStatus>;
  user_doesPhoneNumberExist?: Maybe<ResponseStatus>;
  user_getCurrentUser?: Maybe<SingleResponseBaseOfUser>;
  user_getLoginActivities?: Maybe<ListResponseBaseOfLoginActivity>;
  user_getNearbyUsers?: Maybe<ListResponseBaseOfUser>;
  user_getPhoto?: Maybe<SingleResponseBaseOfUserPhotoGallery>;
  user_getPhotos?: Maybe<ListResponseBaseOfUserPhotoGallery>;
  user_getRequestForVerifications?: Maybe<ListResponseBaseOfRequestForVerification>;
  user_getRolesForSignUp?: Maybe<ListResponseBaseOfRole>;
  user_getSummary?: Maybe<ResponseBaseOfUserSummaryDto>;
  user_getUsers?: Maybe<ListResponseBaseOfUser>;
};

export type QueryUser_DoesEmailExistArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
};

export type QueryUser_DoesPhoneNumberExistArgs = {
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
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

export type RecordFileDto = {
  __typename?: 'RecordFileDto';
  name?: Maybe<Scalars['String']['output']>;
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
};

export type RecordFileDtoSortInput = {
  name?: InputMaybe<SortEnumType>;
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

export type ResponseBaseOfLoginActivity = {
  __typename?: 'ResponseBaseOfLoginActivity';
  result?: Maybe<LoginActivity>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfRequestForVerification = {
  __typename?: 'ResponseBaseOfRequestForVerification';
  result?: Maybe<RequestForVerification>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfString = {
  __typename?: 'ResponseBaseOfString';
  result?: Maybe<Scalars['String']['output']>;
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

export type SignInExternalInput = {
  token?: InputMaybe<Scalars['String']['input']>;
};

export type SignInInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
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

export type SingleResponseBaseOfUser = {
  __typename?: 'SingleResponseBaseOfUser';
  result?: Maybe<User>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfUserPhotoGallery = {
  __typename?: 'SingleResponseBaseOfUserPhotoGallery';
  result?: Maybe<UserPhotoGallery>;
  status?: Maybe<Scalars['Any']['output']>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC',
}

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

export type TokenInput = {
  accessToken?: InputMaybe<Scalars['String']['input']>;
  refreshToken?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  about?: Maybe<Scalars['String']['output']>;
  accessFailedCount: Scalars['Int']['output'];
  age?: Maybe<Scalars['Int']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  concurrencyStamp?: Maybe<Scalars['String']['output']>;
  config?: Maybe<Scalars['String']['output']>;
  createdDate?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  displayContactInfo?: Maybe<Scalars['Boolean']['output']>;
  displayGender?: Maybe<Scalars['Boolean']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emailConfirmed: Scalars['Boolean']['output'];
  externalId: Scalars['String']['output'];
  favoriteCategories?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Gender>;
  height?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  introSeen: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isPrivateAccount: Scalars['Boolean']['output'];
  isVerified: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  lastSeen?: Maybe<Scalars['DateTime']['output']>;
  /** @deprecated Use LocationOfUser */
  latitude?: Maybe<Scalars['Float']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  locationOfUser?: Maybe<GeoJsonPointType>;
  lockoutEnabled: Scalars['Boolean']['output'];
  lockoutEnd?: Maybe<Scalars['DateTime']['output']>;
  /** @deprecated Use LocationOfUser */
  longitude?: Maybe<Scalars['Float']['output']>;
  normalizedEmail?: Maybe<Scalars['String']['output']>;
  normalizedUserName?: Maybe<Scalars['String']['output']>;
  passwordHash?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  phoneNumberConfirmed: Scalars['Boolean']['output'];
  photoUrl?: Maybe<Scalars['String']['output']>;
  profession?: Maybe<Scalars['String']['output']>;
  rateAverage: Scalars['Float']['output'];
  ratePercent_1: Scalars['Float']['output'];
  ratePercent_2: Scalars['Float']['output'];
  ratePercent_3: Scalars['Float']['output'];
  ratePercent_4: Scalars['Float']['output'];
  ratePercent_5: Scalars['Float']['output'];
  reviewCount: Scalars['Int']['output'];
  securityStamp?: Maybe<Scalars['String']['output']>;
  socialLinks?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  streetAddress?: Maybe<Scalars['String']['output']>;
  stripeConnectAccountId?: Maybe<Scalars['String']['output']>;
  stripeConnectCompleted: Scalars['Boolean']['output'];
  twoFactorAuthenticationCode?: Maybe<Scalars['String']['output']>;
  twoFactorAuthenticationEnabled?: Maybe<Scalars['Boolean']['output']>;
  twoFactorEnabled: Scalars['Boolean']['output'];
  unitNumber?: Maybe<Scalars['String']['output']>;
  userRole?: Maybe<Scalars['String']['output']>;
  userType?: Maybe<UserType>;
  username?: Maybe<Scalars['String']['output']>;
  verificationErrors?: Maybe<Scalars['String']['output']>;
  verificationPhotos?: Maybe<Scalars['String']['output']>;
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
  concurrencyStamp?: InputMaybe<StringOperationFilterInput>;
  config?: InputMaybe<StringOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  data?: InputMaybe<StringOperationFilterInput>;
  dateOfBirth?: InputMaybe<DateTimeOperationFilterInput>;
  displayContactInfo?: InputMaybe<BooleanOperationFilterInput>;
  displayGender?: InputMaybe<BooleanOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  emailConfirmed?: InputMaybe<BooleanOperationFilterInput>;
  externalId?: InputMaybe<StringOperationFilterInput>;
  favoriteCategories?: InputMaybe<StringOperationFilterInput>;
  fullName?: InputMaybe<StringOperationFilterInput>;
  gender?: InputMaybe<NullableOfGenderOperationFilterInput>;
  height?: InputMaybe<IntOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  introSeen?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isPrivateAccount?: InputMaybe<BooleanOperationFilterInput>;
  isVerified?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  lastSeen?: InputMaybe<DateTimeOperationFilterInput>;
  latitude?: InputMaybe<FloatOperationFilterInput>;
  location?: InputMaybe<StringOperationFilterInput>;
  locationOfUser?: InputMaybe<PointFilterInput>;
  lockoutEnabled?: InputMaybe<BooleanOperationFilterInput>;
  lockoutEnd?: InputMaybe<DateTimeOperationFilterInput>;
  longitude?: InputMaybe<FloatOperationFilterInput>;
  normalizedEmail?: InputMaybe<StringOperationFilterInput>;
  normalizedUserName?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<UserFilterInput>>;
  passwordHash?: InputMaybe<StringOperationFilterInput>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  phoneNumberConfirmed?: InputMaybe<BooleanOperationFilterInput>;
  photoUrl?: InputMaybe<StringOperationFilterInput>;
  profession?: InputMaybe<StringOperationFilterInput>;
  rateAverage?: InputMaybe<FloatOperationFilterInput>;
  ratePercent_1?: InputMaybe<FloatOperationFilterInput>;
  ratePercent_2?: InputMaybe<FloatOperationFilterInput>;
  ratePercent_3?: InputMaybe<FloatOperationFilterInput>;
  ratePercent_4?: InputMaybe<FloatOperationFilterInput>;
  ratePercent_5?: InputMaybe<FloatOperationFilterInput>;
  reviewCount?: InputMaybe<IntOperationFilterInput>;
  securityStamp?: InputMaybe<StringOperationFilterInput>;
  socialLinks?: InputMaybe<StringOperationFilterInput>;
  state?: InputMaybe<StringOperationFilterInput>;
  streetAddress?: InputMaybe<StringOperationFilterInput>;
  stripeConnectAccountId?: InputMaybe<StringOperationFilterInput>;
  stripeConnectCompleted?: InputMaybe<BooleanOperationFilterInput>;
  twoFactorAuthenticationCode?: InputMaybe<StringOperationFilterInput>;
  twoFactorAuthenticationEnabled?: InputMaybe<BooleanOperationFilterInput>;
  twoFactorEnabled?: InputMaybe<BooleanOperationFilterInput>;
  unitNumber?: InputMaybe<StringOperationFilterInput>;
  userRole?: InputMaybe<StringOperationFilterInput>;
  userType?: InputMaybe<NullableOfUserTypeOperationFilterInput>;
  username?: InputMaybe<StringOperationFilterInput>;
  verificationErrors?: InputMaybe<StringOperationFilterInput>;
  verificationPhotos?: InputMaybe<StringOperationFilterInput>;
  yearsOfExperience?: InputMaybe<IntOperationFilterInput>;
  zipCode?: InputMaybe<StringOperationFilterInput>;
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
  email?: InputMaybe<Scalars['String']['input']>;
  favoriteCategories?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  height?: InputMaybe<Scalars['Int']['input']>;
  introSeen?: InputMaybe<Scalars['Boolean']['input']>;
  isPrivateAccount?: InputMaybe<Scalars['Boolean']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  photoUrl?: InputMaybe<Scalars['String']['input']>;
  profession?: InputMaybe<Scalars['String']['input']>;
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
  yearsOfExperience?: InputMaybe<Scalars['Int']['input']>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
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
  concurrencyStamp?: InputMaybe<SortEnumType>;
  config?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  data?: InputMaybe<SortEnumType>;
  dateOfBirth?: InputMaybe<SortEnumType>;
  displayContactInfo?: InputMaybe<SortEnumType>;
  displayGender?: InputMaybe<SortEnumType>;
  email?: InputMaybe<SortEnumType>;
  emailConfirmed?: InputMaybe<SortEnumType>;
  externalId?: InputMaybe<SortEnumType>;
  favoriteCategories?: InputMaybe<SortEnumType>;
  fullName?: InputMaybe<SortEnumType>;
  gender?: InputMaybe<SortEnumType>;
  height?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  introSeen?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isPrivateAccount?: InputMaybe<SortEnumType>;
  isVerified?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  lastSeen?: InputMaybe<SortEnumType>;
  latitude?: InputMaybe<SortEnumType>;
  location?: InputMaybe<SortEnumType>;
  locationOfUser?: InputMaybe<PointSortInput>;
  lockoutEnabled?: InputMaybe<SortEnumType>;
  lockoutEnd?: InputMaybe<SortEnumType>;
  longitude?: InputMaybe<SortEnumType>;
  normalizedEmail?: InputMaybe<SortEnumType>;
  normalizedUserName?: InputMaybe<SortEnumType>;
  passwordHash?: InputMaybe<SortEnumType>;
  phoneNumber?: InputMaybe<SortEnumType>;
  phoneNumberConfirmed?: InputMaybe<SortEnumType>;
  photoUrl?: InputMaybe<SortEnumType>;
  profession?: InputMaybe<SortEnumType>;
  rateAverage?: InputMaybe<SortEnumType>;
  ratePercent_1?: InputMaybe<SortEnumType>;
  ratePercent_2?: InputMaybe<SortEnumType>;
  ratePercent_3?: InputMaybe<SortEnumType>;
  ratePercent_4?: InputMaybe<SortEnumType>;
  ratePercent_5?: InputMaybe<SortEnumType>;
  reviewCount?: InputMaybe<SortEnumType>;
  securityStamp?: InputMaybe<SortEnumType>;
  socialLinks?: InputMaybe<SortEnumType>;
  state?: InputMaybe<SortEnumType>;
  streetAddress?: InputMaybe<SortEnumType>;
  stripeConnectAccountId?: InputMaybe<SortEnumType>;
  stripeConnectCompleted?: InputMaybe<SortEnumType>;
  twoFactorAuthenticationCode?: InputMaybe<SortEnumType>;
  twoFactorAuthenticationEnabled?: InputMaybe<SortEnumType>;
  twoFactorEnabled?: InputMaybe<SortEnumType>;
  unitNumber?: InputMaybe<SortEnumType>;
  userRole?: InputMaybe<SortEnumType>;
  userType?: InputMaybe<SortEnumType>;
  username?: InputMaybe<SortEnumType>;
  verificationErrors?: InputMaybe<SortEnumType>;
  verificationPhotos?: InputMaybe<SortEnumType>;
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
    query agora_getRecordFiles($skip: Int, $take: Int, $where: RecordFileDtoFilterInput, $order: [RecordFileDtoSortInput!]) {
  agora_getRecordFiles {
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
