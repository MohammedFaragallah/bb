export enum Title {
	Athlete = 'Athlete',
	Doctor = 'Doctor',
	InternationalNutritionist = 'International Nutritionist',
	Nutritionist = 'Nutritionist',
	Pt = 'Pt',
	Trainer = 'Trainer',
}

export enum LikesTypes {
	champion = 'champion',
	event = 'event',
	exercise = 'exercise',
	story = 'story',
}

export enum CommentsTypes {
	event = 'event',
	exercise = 'exercise',
	product = 'product',
	story = 'story',
}

export enum RatesTypes {
	champion = 'champion',
	event = 'event',
	exercise = 'exercise',
	product = 'product',
	story = 'story',
}

export enum Order {
	desc = 'DESC',
	asc = 'ASC',
}

export enum OrderNum {
	desc = -1,
	asc = 1,
}

export enum Direction {
	rtl = 'rtl',
	ltr = 'ltr',
}

export enum StoriesViews {
	list = 'list',
	module = 'module',
}

export enum SubString {
	smallSubString = 50,
	medSubString = 200,
	largeSubString = 400,
}

export enum Environments {
	development = 'development',
	production = 'production',
	all = 'all',
}

export enum AddressesNames {
	firstAddress = 'firstAddress',
	secondAddress = 'secondAddress',
}

export enum Roles {
	admin = 'admin',
	editor = 'editor',
	user = 'user',
}

export enum Gender {
	Female = 'Female',
	Male = 'Male',
}

export enum Goals {
	Bulk = 'Bulk',
	Endurance = 'Endurance',
	FatLoss = 'Fat loss',
	Fitness = 'Fitness',
	MassGain = 'Mass gain',
	MuscleMass = 'Muscle mass',
	MuscleStrength = 'Muscle strength',
	Shred = 'Shred',
}

export enum PaletteType {
	dark = 'dark',
	light = 'light',
}

// TODO: complete list of query params in the effort of systemizing
export enum AdsLocations {
	HOME_SECTION = 'Home Section',
	MEGA_MENU = 'Mega Menu',
	POPUP = 'Popup',
	SLIDER = 'Slider',
}

export enum CartStatus {
	DELIVERED = 'Delivered',
	PROCESSING = 'Processing',
	WAITING = 'Waiting',
	InProgress = 'InProgress',
}

export enum ActionTypes {
	ADD_LOADING = 'ADD_LOADING',
	ADD_VISITED = 'ADD_VISITED',
	CHANGE_LANGUAGE = 'CHANGE_LANGUAGE',
	CLIENT_AUTH_SUCCESS = 'CLIENT_AUTH_SUCCESS',
	CLOSE_POPUP = 'CLOSE_POPUP',
	CLOSE_SNACKBAR = 'CLOSE_SNACKBAR',
	CLOSE_ALL_SNACKBAR = 'CLOSE_ALL_SNACKBAR',
	ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR',
	GET_IP_DATA_SUCCESS = 'GET_IP_DATA_SUCCESS',
	LOGIN_FAILED = 'LOGIN_FAILED',
	LOGIN_SUCCESS = 'LOGIN_SUCCESS',
	LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
	REMOVE_LOADING = 'REMOVE_LOADING',
	REMOVE_SNACKBAR = 'REMOVE_SNACKBAR',
	SET_SEARCH = 'SET_SEARCH',
	RESET_UI = 'RESET_UI',
	SET_MINI_MENU = 'SET_MINI_MENU',
	SET_PRINT_MODE = 'SET_PRINT_MODE',
	SET_TAB_INDEX = 'SET_TAB_INDEX',
	SET_PALETTE = 'SET_PALETTE',
	UPDATE_USER_FAILED = 'UPDATE_USER_FAILED',
	UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS',
	OFFLINE_READY = 'OFFLINE_READY',
	OPEN_TIMER = 'OPEN_TIMER',
	GET_CART = 'GET_CART',
}

export enum LanguageCode {
	ar = 'ar',
	en = 'en',
}

export enum CategoriesTypes {
	articles = 'articles',
	exercises = 'exercises',
	store = 'store',
}

export enum LargeHeaderMenus {
	articles = 'articles',
	exercises = 'exercises',
	community = 'community',
	events = 'events',
	store = 'store',
}

export enum Muscles {
	FOREARM_BRACHIORADIALIS = 'Forearm brachioradialis',
	GLUTES_GLUTEUS_MAXIMUS_AND_MEDIUS = 'Glutes gluteus maximus and medius',
	HAMSTRINGS_BICEPS_FEMORIS = 'Hamstrings biceps femoris',
	TRICEPS_TRICEPS_BRACHII = 'Triceps triceps brachii',
	ABS_RECTUS_ABDOMINIS = 'Abs rectus abdominis',
	BICEPS_BICEPS_BRACHII = 'Biceps biceps brachii',
	CALVES_GASTROCNEMIUS = 'Calves gastrocnemius',
	CHEST_PECTORALIS = 'Chest pectoralis',
	LATS_LATISSIMUS_DORSI = 'Lats latissimus dorsi',
	LOWER_BACK = 'Lower back',
	MIDDLE_BACK_RHOMBOIDS = 'Middle back rhomboids',
	NECK = 'Neck',
	QUADS_QUADRICEPS = 'Quads quadriceps',
	SHOULDERS_DELTOIDS = 'Shoulders deltoids',
	TRAPS_TRAPEZIUS = 'Traps trapezius',
}

export enum FitnessLevel {
	Advanced = 'Advanced',
	Beginner = 'Beginner',
	Intermediate = 'Intermediate',
}

export enum Equipments {
	BANDS = 'Bands',
	BARBELL = 'Barbell',
	BODY_READ_ONLYMACHINE = 'Body read onlymachine',
	CABLE = 'Cable',
	DUMBBELL = 'Dumbbell',
	E_Z_CURL_BAR = 'E z curl bar',
	EXERCISE_BALL = 'Exercise ball',
	FOAM_ROLL = 'Foam roll',
	KETTLEBELLS = 'Kettlebells',
	MEDICINE_BALL = 'Medicine ball',
	NONE = 'None',
	OTHER = 'Other',
}

export enum Forms {
	Powder = 'Powder',
	Capsule = 'Capsule',
	Tablet = 'Tablet',
	Liquid = 'Liquid',
	Bars = 'Bars',
	Other = 'Other',
}
