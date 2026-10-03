(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/Providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$MealContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/MealContext.tsx [app-client] (ecmascript)");
'use client';
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$MealContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MealProvider"], {
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/Providers.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Providers.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/context/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AuthProvider = ({ children })=>{
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [guestUser, setGuestUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showAuthModal, setShowAuthModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [authModalMode, setAuthModalMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('signin');
    const [isConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const openAuthModal = (modalMode = 'signin')=>{
        setAuthModalMode(modalMode);
        setShowAuthModal(true);
    };
    /**
   * User Authentication Handler
   */ const handleUserAuthenticated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[handleUserAuthenticated]": async (authUser, providerType = 'local')=>{
            setUser(authUser);
            setGuestUser(authUser.isAnonymous);
            localStorage.removeItem('mealai_guest_mode');
            localStorage.removeItem('mealai_guest_profile');
            try {
                const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserProfile"])(authUser.uid);
                if (existing) {
                    const merged = {
                        ...existing,
                        id: authUser.uid,
                        uid: authUser.uid,
                        email: authUser.email || existing.email || '',
                        name: existing.name || authUser.displayName || 'Chef',
                        displayName: existing.displayName || authUser.displayName || existing.name || 'Chef',
                        avatar: existing.avatar || authUser.photoURL || '',
                        photoURL: existing.photoURL || authUser.photoURL || existing.avatar || '',
                        provider: existing.provider || providerType,
                        updatedAt: new Date().toISOString()
                    };
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveUserProfile"])(merged);
                    setProfile(merged);
                } else {
                    const newProfile = {
                        id: authUser.uid,
                        uid: authUser.uid,
                        name: authUser.displayName || (authUser.email ? authUser.email.split('@')[0] : 'Chef'),
                        displayName: authUser.displayName || (authUser.email ? authUser.email.split('@')[0] : 'Chef'),
                        email: authUser.email || '',
                        phoneNumber: authUser.phoneNumber || undefined,
                        avatar: authUser.photoURL || '',
                        photoURL: authUser.photoURL || '',
                        provider: providerType,
                        dietaryPreferences: [],
                        allergies: [],
                        favoriteCuisines: [
                            'Italian',
                            'Mexican',
                            'Asian'
                        ],
                        skillLevel: 'easy',
                        householdSize: 2,
                        preferredAppliances: [
                            'Stovetop',
                            'Oven'
                        ],
                        calorieGoal: 2000,
                        proteinGoal: 90,
                        dailyBudget: 25,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    };
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveUserProfile"])(newProfile);
                    setProfile(newProfile);
                }
            } catch (error) {
                console.error('[AuthContext] Error loading/creating user profile:', error);
            }
        }
    }["AuthProvider.useCallback[handleUserAuthenticated]"], []);
    // Initialize authentication state from local storage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const localUser = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUser"]();
            if (localUser) {
                handleUserAuthenticated(localUser, 'password');
                setLoading(false);
                return;
            }
            const isGuest = localStorage.getItem('mealai_guest_mode') === 'true';
            if (isGuest) {
                setGuestUser(true);
                const guest = {
                    id: 'guest_user',
                    uid: 'guest_user',
                    name: 'Guest Chef',
                    displayName: 'Guest Chef',
                    email: 'guest@mealai.app',
                    avatar: '',
                    photoURL: '',
                    provider: 'guest',
                    dietaryPreferences: [],
                    allergies: [],
                    favoriteCuisines: [
                        'Italian',
                        'Mediterranean',
                        'Mexican'
                    ],
                    skillLevel: 'easy',
                    householdSize: 2,
                    preferredAppliances: [
                        'Stovetop',
                        'Oven',
                        'Air Fryer'
                    ],
                    calorieGoal: 2000,
                    proteinGoal: 90,
                    dailyBudget: 25,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                setProfile(guest);
            } else {
                setUser(null);
                setGuestUser(false);
                setProfile(null);
            }
            setLoading(false);
        }
    }["AuthProvider.useEffect"], [
        handleUserAuthenticated
    ]);
    const continueAsGuest = ()=>{
        setLoading(true);
        setGuestUser(true);
        localStorage.setItem('mealai_guest_mode', 'true');
        const guest = {
            id: 'guest_user',
            uid: 'guest_user',
            name: 'Guest Chef',
            displayName: 'Guest Chef',
            email: 'guest@mealai.app',
            avatar: '',
            photoURL: '',
            provider: 'guest',
            dietaryPreferences: [],
            allergies: [],
            favoriteCuisines: [
                'Italian',
                'Mediterranean',
                'Mexican'
            ],
            skillLevel: 'easy',
            householdSize: 2,
            preferredAppliances: [
                'Stovetop',
                'Oven',
                'Air Fryer'
            ],
            calorieGoal: 2000,
            proteinGoal: 90,
            dailyBudget: 25,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        setProfile(guest);
        setShowAuthModal(false);
        setLoading(false);
    };
    const signInWithGoogle = async ()=>{
        const authUser = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signInWithGoogleFlow"]();
        await handleUserAuthenticated(authUser, 'google');
        setShowAuthModal(false);
    };
    const signInWithEmail = async (email, pass)=>{
        const authUser = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signInWithEmail"](email, pass);
        await handleUserAuthenticated(authUser, 'password');
        setShowAuthModal(false);
    };
    const signUpWithEmail = async (email, pass, name)=>{
        const authUser = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signUpWithEmail"](email, pass, name);
        await handleUserAuthenticated(authUser, 'password');
        setShowAuthModal(false);
    };
    const signOut = async ()=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signOutUser"]();
            setUser(null);
            setGuestUser(false);
            setProfile(null);
            localStorage.removeItem('mealai_guest_mode');
            localStorage.removeItem('mealai_guest_profile');
        } catch (error) {
            console.error('[AuthContext] Sign-out error:', error);
        }
    };
    const sendPasswordReset = async (email)=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetPassword"](email);
    };
    const sendPhoneCode = async (phoneNumber, containerId)=>{
        const verifier = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupRecaptchaVerifier"](containerId);
        return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendPhoneCode"](phoneNumber, verifier);
    };
    const verifyPhoneCode = async (confirmationResult, code)=>{
        const authUser = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verifyPhoneCode"](confirmationResult, code);
        await handleUserAuthenticated(authUser, 'phone');
        setShowAuthModal(false);
    };
    const updateProfile = async (updated)=>{
        if (!profile) return;
        const newProfile = {
            ...profile,
            ...updated,
            updatedAt: new Date().toISOString()
        };
        setProfile(newProfile);
        if (user) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveUserProfile"])(newProfile);
        } else if (guestUser) {
            localStorage.setItem('mealai_guest_profile', JSON.stringify(newProfile));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            profile,
            loading,
            guestUser,
            signInWithGoogle,
            signInWithEmail,
            signUpWithEmail,
            sendPhoneCode,
            verifyPhoneCode,
            signOut,
            sendPasswordReset,
            updateProfile,
            continueAsGuest,
            showAuthModal,
            setShowAuthModal,
            authModalMode,
            openAuthModal,
            isConnected,
            firebaseConnected: isConnected
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/AuthContext.tsx",
        lineNumber: 243,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AuthProvider, "L5L2NiMOGvIEV6LqrCG/sAFxmQo=");
_c = AuthProvider;
const useAuth = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/context/MealContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MealProvider",
    ()=>MealProvider,
    "useMeal",
    ()=>useMeal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
// Initial starter pantry items for new users/guests
const DEFAULT_PANTRY = [
    {
        id: 'p_1',
        userId: 'default',
        name: 'Olive Oil',
        category: 'Pantry Staples',
        quantity: '500ml',
        unit: 'ml'
    },
    {
        id: 'p_2',
        userId: 'default',
        name: 'Garlic',
        category: 'Produce',
        quantity: '1 bulb',
        unit: 'head'
    },
    {
        id: 'p_3',
        userId: 'default',
        name: 'Basmati Rice',
        category: 'Grains & Pasta',
        quantity: '1 kg',
        unit: 'kg'
    },
    {
        id: 'p_4',
        userId: 'default',
        name: 'Eggs',
        category: 'Dairy & Eggs',
        quantity: '6',
        unit: 'count'
    },
    {
        id: 'p_5',
        userId: 'default',
        name: 'Chicken Breast',
        category: 'Meat & Seafood',
        quantity: '2 portions',
        unit: 'portions'
    },
    {
        id: 'p_6',
        userId: 'default',
        name: 'Tomatoes',
        category: 'Produce',
        quantity: '4',
        unit: 'count'
    },
    {
        id: 'p_7',
        userId: 'default',
        name: 'Red Onion',
        category: 'Produce',
        quantity: '2',
        unit: 'count'
    },
    {
        id: 'p_8',
        userId: 'default',
        name: 'Soy Sauce',
        category: 'Condiments',
        quantity: '250ml',
        unit: 'ml'
    }
];
// Initial featured sample recipes
const RAW_FEATURED_RECIPES = [
    {
        id: 'rec_crispy_airfryer_chicken',
        userId: 'default',
        title: 'Crispy Garlic Herb Air-Fryer Chicken Bites',
        description: 'Tender chicken breast tossed in smoked paprika, garlic, and fresh herbs, air-fried to golden crispy perfection with vibrant roasted tomatoes and basmati rice.',
        cuisine: 'American',
        mealType: 'dinner',
        dietary: [
            'High-Protein',
            'Gluten-Free',
            'Quick'
        ],
        prepTime: 10,
        cookTime: 12,
        totalTime: 22,
        servings: 2,
        calories: 460,
        protein: 42,
        carbs: 28,
        fat: 16,
        fiber: 4,
        difficulty: 'easy',
        appliances: [
            'Air Fryer'
        ],
        ingredients: [
            {
                name: 'Chicken Breast',
                amount: '2',
                unit: 'breasts (400g)',
                category: 'Meat & Seafood',
                note: 'cubed'
            },
            {
                name: 'Garlic',
                amount: '3',
                unit: 'cloves',
                category: 'Produce',
                note: 'minced'
            },
            {
                name: 'Olive Oil',
                amount: '1',
                unit: 'tbsp',
                category: 'Pantry Staples'
            },
            {
                name: 'Cherry Tomatoes',
                amount: '1',
                unit: 'cup',
                category: 'Produce'
            },
            {
                name: 'Smoked Paprika',
                amount: '1',
                unit: 'tsp',
                category: 'Spices'
            },
            {
                name: 'Basmati Rice',
                amount: '1',
                unit: 'cup cooked',
                category: 'Grains & Pasta'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Season Chicken',
                instruction: 'Toss diced chicken bites with olive oil, minced garlic, smoked paprika, salt, and freshly cracked black pepper.',
                timerMinutes: null,
                tip: 'Dry chicken with paper towel first.'
            },
            {
                step: 2,
                title: 'Air Fry',
                instruction: 'Preheat air fryer to 390°F (200°C). Place chicken bites in a single layer and cook for 12 minutes, shaking basket at minute 6.',
                timerMinutes: 12,
                tip: 'Add cherry tomatoes for the last 4 minutes.'
            },
            {
                step: 3,
                title: 'Plate & Garnish',
                instruction: 'Serve warm over steamed basmati rice with a squeeze of fresh lemon juice.',
                timerMinutes: null
            }
        ],
        tips: [
            'Works great with chicken thighs too for extra juiciness.',
            'Great for meal prep lunches.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1000&q=80',
        isFavorite: true,
        source: 'chef_pick',
        matchedPantryCount: 5,
        missingIngredientsCount: 1,
        createdAt: new Date().toISOString()
    },
    {
        id: 'rec_shakshuka_eggs',
        userId: 'default',
        title: 'Silky Mediterranean Shakshuka',
        description: 'Gently poached organic eggs simmered in a spiced tomato, sweet pepper, and garlic reduction with crumbles of tangy feta and warm crusty bread.',
        cuisine: 'Mediterranean',
        mealType: 'breakfast',
        dietary: [
            'Vegetarian',
            'High-Protein'
        ],
        prepTime: 8,
        cookTime: 16,
        totalTime: 24,
        servings: 2,
        calories: 380,
        protein: 21,
        carbs: 26,
        fat: 20,
        fiber: 6,
        difficulty: 'easy',
        appliances: [
            'Stovetop'
        ],
        ingredients: [
            {
                name: 'Eggs',
                amount: '4',
                unit: 'large',
                category: 'Dairy & Eggs'
            },
            {
                name: 'Tomatoes',
                amount: '4',
                unit: 'ripe',
                category: 'Produce',
                note: 'crushed'
            },
            {
                name: 'Red Onion',
                amount: '1',
                unit: 'medium',
                category: 'Produce',
                note: 'diced'
            },
            {
                name: 'Garlic',
                amount: '3',
                unit: 'cloves',
                category: 'Produce',
                note: 'sliced'
            },
            {
                name: 'Olive Oil',
                amount: '2',
                unit: 'tbsp',
                category: 'Pantry Staples'
            },
            {
                name: 'Ground Cumin & Paprika',
                amount: '1',
                unit: 'tsp each',
                category: 'Spices'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Sauté Aromatics',
                instruction: 'Heat olive oil in a skillet over medium heat. Sauté onion and garlic until translucent and fragrant.',
                timerMinutes: 4
            },
            {
                step: 2,
                title: 'Simmer Tomato Sauce',
                instruction: 'Add crushed tomatoes, cumin, and paprika. Simmer gently until thickened.',
                timerMinutes: 6
            },
            {
                step: 3,
                title: 'Poach Eggs',
                instruction: 'Make 4 wells in the sauce. Crack an egg into each well. Cover skillet and cook until whites are set and yolks are still runny.',
                timerMinutes: 6,
                tip: 'Keep lid tightly closed to trap steam.'
            }
        ],
        tips: [
            'Garnish with fresh cilantro or parsley.',
            'Serve straight from skillet.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
        isFavorite: false,
        source: 'chef_pick',
        matchedPantryCount: 5,
        missingIngredientsCount: 0,
        createdAt: new Date().toISOString()
    },
    {
        id: 'rec_asian_garlic_noodles',
        userId: 'default',
        title: '15-Minute Butter Garlic Scallion Noodles',
        description: 'Springy noodles tossed in browned garlic butter, dark soy reduction, chili crisp, and a shower of toasted sesame seeds.',
        cuisine: 'Asian',
        mealType: 'lunch',
        dietary: [
            'Vegetarian',
            'Quick'
        ],
        prepTime: 5,
        cookTime: 10,
        totalTime: 15,
        servings: 2,
        calories: 420,
        protein: 14,
        carbs: 58,
        fat: 16,
        fiber: 3,
        difficulty: 'beginner',
        appliances: [
            'Stovetop'
        ],
        ingredients: [
            {
                name: 'Noodles or Pasta',
                amount: '200',
                unit: 'g',
                category: 'Grains & Pasta'
            },
            {
                name: 'Garlic',
                amount: '6',
                unit: 'cloves',
                category: 'Produce',
                note: 'finely minced'
            },
            {
                name: 'Butter',
                amount: '2',
                unit: 'tbsp',
                category: 'Dairy & Eggs'
            },
            {
                name: 'Soy Sauce',
                amount: '2',
                unit: 'tbsp',
                category: 'Condiments'
            },
            {
                name: 'Scallions / Green Onions',
                amount: '3',
                unit: 'stalks',
                category: 'Produce'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Boil Noodles',
                instruction: 'Cook noodles in salted boiling water until al dente. Reserve 1/4 cup pasta water and drain.',
                timerMinutes: 6
            },
            {
                step: 2,
                title: 'Brown Garlic',
                instruction: 'In a wok or skillet, melt butter over medium-low heat. Add garlic and cook gently until fragrant and light golden.',
                timerMinutes: 3
            },
            {
                step: 3,
                title: 'Toss & Emulsify',
                instruction: 'Stir in soy sauce, reserved water, and cooked noodles. Toss vigorously for 1 minute until glazed.',
                timerMinutes: 1
            }
        ],
        tips: [
            'Add a fried egg or shredded chicken on top for extra protein.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80',
        isFavorite: true,
        source: 'chef_pick',
        matchedPantryCount: 3,
        missingIngredientsCount: 2,
        createdAt: new Date().toISOString()
    }
];
const FEATURED_RECIPES = RAW_FEATURED_RECIPES.map(_c = (r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeRecipeData"])(r));
_c1 = FEATURED_RECIPES;
const MealContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const MealProvider = ({ children })=>{
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [recipes, setRecipes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(FEATURED_RECIPES);
    const [pantry, setPantry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_PANTRY);
    const [groceryList, setGroceryList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentPlan, setCurrentPlanState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeCookingRecipe, setActiveCookingRecipe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeCookingStep, setActiveCookingStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [loadingData, setLoadingData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Large Catalog & Taxonomy State
    const [catalogRecipes, setCatalogRecipes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [catalogIngredients, setCatalogIngredients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [catalogTaxonomies, setCatalogTaxonomies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        cuisines: [],
        mealTypes: [],
        dietaryTags: [],
        appliances: []
    });
    const [isSeeding, setIsSeeding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Load catalog on boot
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MealProvider.useEffect": ()=>{
            let active = true;
            async function loadCatalog() {
                try {
                    const [recs, ings, tax] = await Promise.all([
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCatalogRecipes"])(),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCatalogIngredients"])(),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCatalogTaxonomies"])()
                    ]);
                    if (active) {
                        setCatalogRecipes(recs);
                        setCatalogIngredients(ings);
                        setCatalogTaxonomies(tax);
                    }
                } catch (err) {
                    console.warn('Error loading catalog data:', err);
                }
            }
            loadCatalog();
            return ({
                "MealProvider.useEffect": ()=>{
                    active = false;
                }
            })["MealProvider.useEffect"];
        }
    }["MealProvider.useEffect"], []);
    // Sync data when user logs in or changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MealProvider.useEffect": ()=>{
            let isMounted = true;
            const loadUserData = {
                "MealProvider.useEffect.loadUserData": async ()=>{
                    if (user) {
                        setLoadingData(true);
                        try {
                            const [userRecs, userPantryItems, userGroceries, userPlans] = await Promise.all([
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserRecipes"])(user.uid).catch({
                                    "MealProvider.useEffect.loadUserData": ()=>[]
                                }["MealProvider.useEffect.loadUserData"]),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserPantry"])(user.uid).catch({
                                    "MealProvider.useEffect.loadUserData": ()=>[]
                                }["MealProvider.useEffect.loadUserData"]),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserGroceryItems"])(user.uid).catch({
                                    "MealProvider.useEffect.loadUserData": ()=>[]
                                }["MealProvider.useEffect.loadUserData"]),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserMealPlans"])(user.uid).catch({
                                    "MealProvider.useEffect.loadUserData": ()=>[]
                                }["MealProvider.useEffect.loadUserData"])
                            ]);
                            if (isMounted) {
                                setRecipes([
                                    ...FEATURED_RECIPES,
                                    ...userRecs
                                ]);
                                if (userPantryItems && userPantryItems.length > 0) {
                                    setPantry(userPantryItems);
                                } else {
                                    // Seed default pantry for user if empty
                                    const seeded = DEFAULT_PANTRY.map({
                                        "MealProvider.useEffect.loadUserData.seeded": (item)=>({
                                                ...item,
                                                userId: user.uid
                                            })
                                    }["MealProvider.useEffect.loadUserData.seeded"]);
                                    setPantry(seeded);
                                    seeded.forEach({
                                        "MealProvider.useEffect.loadUserData": (it)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["savePantryItem"])(it).catch({
                                                "MealProvider.useEffect.loadUserData": ()=>{}
                                            }["MealProvider.useEffect.loadUserData"])
                                    }["MealProvider.useEffect.loadUserData"]);
                                }
                                setGroceryList(userGroceries || []);
                                if (userPlans && userPlans.length > 0) {
                                    setCurrentPlanState(userPlans[0]);
                                }
                            }
                        } catch (e) {
                            console.error('Error loading user data:', e);
                        } finally{
                            if (isMounted) setLoadingData(false);
                        }
                    } else {
                        // Load from local storage for guest
                        const localRecs = localStorage.getItem('mealai_saved_recipes');
                        if (localRecs) {
                            try {
                                setRecipes([
                                    ...FEATURED_RECIPES,
                                    ...JSON.parse(localRecs)
                                ]);
                            } catch  {}
                        }
                        const localPantry = localStorage.getItem('mealai_pantry');
                        if (localPantry) {
                            try {
                                setPantry(JSON.parse(localPantry));
                            } catch  {}
                        }
                        const localGroceries = localStorage.getItem('mealai_grocery');
                        if (localGroceries) {
                            try {
                                setGroceryList(JSON.parse(localGroceries));
                            } catch  {}
                        }
                        const localPlan = localStorage.getItem('mealai_current_plan');
                        if (localPlan) {
                            try {
                                setCurrentPlanState(JSON.parse(localPlan));
                            } catch  {}
                        }
                    }
                }
            }["MealProvider.useEffect.loadUserData"];
            loadUserData();
            return ({
                "MealProvider.useEffect": ()=>{
                    isMounted = false;
                }
            })["MealProvider.useEffect"];
        }
    }["MealProvider.useEffect"], [
        user
    ]);
    // Recipe actions
    const saveRecipe = async (recipe)=>{
        const updated = [
            recipe,
            ...recipes.filter((r)=>r.id !== recipe.id)
        ];
        setRecipes(updated);
        if (user) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveRecipeToFirestore"])({
                ...recipe,
                userId: user.uid
            });
        } else {
            localStorage.setItem('mealai_saved_recipes', JSON.stringify(updated.filter((r)=>r.source !== 'chef_pick')));
        }
    };
    const deleteRecipe = async (recipeId)=>{
        const updated = recipes.filter((r)=>r.id !== recipeId);
        setRecipes(updated);
        if (user) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteRecipeFromFirestore"])(recipeId);
        } else {
            localStorage.setItem('mealai_saved_recipes', JSON.stringify(updated.filter((r)=>r.source !== 'chef_pick')));
        }
    };
    const toggleFavorite = async (recipeId)=>{
        const recipe = recipes.find((r)=>r.id === recipeId);
        if (!recipe) return;
        const newFav = !recipe.isFavorite;
        const updated = recipes.map((r)=>r.id === recipeId ? {
                ...r,
                isFavorite: newFav
            } : r);
        setRecipes(updated);
        if (user) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toggleRecipeFavorite"])(recipeId, newFav);
        } else {
            localStorage.setItem('mealai_saved_recipes', JSON.stringify(updated.filter((r)=>r.source !== 'chef_pick')));
        }
    };
    // Pantry actions
    const addPantryItem = async (itemData)=>{
        const newItem = {
            ...itemData,
            id: 'pantry_' + Math.random().toString(36).substring(2, 9),
            userId: user ? user.uid : 'guest_user',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        const updated = [
            newItem,
            ...pantry
        ];
        setPantry(updated);
        if (user) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["savePantryItem"])(newItem);
        } else {
            localStorage.setItem('mealai_pantry', JSON.stringify(updated));
        }
    };
    const removePantryItem = async (id)=>{
        const updated = pantry.filter((p)=>p.id !== id);
        setPantry(updated);
        if (user) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deletePantryItem"])(id);
        } else {
            localStorage.setItem('mealai_pantry', JSON.stringify(updated));
        }
    };
    const updatePantryItem = async (id, updates)=>{
        const updated = pantry.map((p)=>p.id === id ? {
                ...p,
                ...updates,
                updatedAt: new Date().toISOString()
            } : p);
        setPantry(updated);
        if (user) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updatePantryItemInFirestore"])(id, updates);
        } else {
            localStorage.setItem('mealai_pantry', JSON.stringify(updated));
        }
    };
    // Grocery actions
    const addGroceryItem = async (itemData)=>{
        const newItem = {
            ...itemData,
            id: 'groc_' + Math.random().toString(36).substring(2, 9),
            userId: user ? user.uid : 'guest_user',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        const updated = [
            newItem,
            ...groceryList
        ];
        setGroceryList(updated);
        if (user) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveGroceryItem"])(newItem);
        } else {
            localStorage.setItem('mealai_grocery', JSON.stringify(updated));
        }
    };
    const updateGroceryItem = async (id, updates)=>{
        const updated = groceryList.map((g)=>g.id === id ? {
                ...g,
                ...updates,
                updatedAt: new Date().toISOString()
            } : g);
        setGroceryList(updated);
        if (user) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateGroceryItemInFirestore"])(id, updates);
        } else {
            localStorage.setItem('mealai_grocery', JSON.stringify(updated));
        }
    };
    const toggleGroceryItem = async (id)=>{
        const item = groceryList.find((g)=>g.id === id);
        if (!item) return;
        const newChecked = !item.checked;
        const updated = groceryList.map((g)=>g.id === id ? {
                ...g,
                checked: newChecked
            } : g);
        setGroceryList(updated);
        if (user) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toggleGroceryChecked"])(id, newChecked);
        } else {
            localStorage.setItem('mealai_grocery', JSON.stringify(updated));
        }
    };
    const removeGroceryItem = async (id)=>{
        const updated = groceryList.filter((g)=>g.id !== id);
        setGroceryList(updated);
        if (user) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteGroceryItem"])(id);
        } else {
            localStorage.setItem('mealai_grocery', JSON.stringify(updated));
        }
    };
    const clearCheckedGroceryItems = async ()=>{
        const toDelete = groceryList.filter((g)=>g.checked);
        const updated = groceryList.filter((g)=>!g.checked);
        setGroceryList(updated);
        if (user) {
            for (const item of toDelete){
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteGroceryItem"])(item.id);
            }
        } else {
            localStorage.setItem('mealai_grocery', JSON.stringify(updated));
        }
    };
    const addRecipeIngredientsToGrocery = async (recipe)=>{
        const pantryNames = pantry.map((p)=>p.name.toLowerCase());
        let addedCount = 0;
        for (const ing of recipe.ingredients){
            const isAlreadyInPantry = pantryNames.some((p)=>p.includes(ing.name.toLowerCase()) || ing.name.toLowerCase().includes(p));
            if (!isAlreadyInPantry) {
                await addGroceryItem({
                    name: ing.name,
                    quantity: `${ing.amount} ${ing.unit || ''}`.trim(),
                    category: ing.category || 'Produce',
                    checked: false,
                    recipeTitle: recipe.title
                });
                addedCount++;
            }
        }
        return addedCount;
    };
    const addWeekToGroceryList = async (plan)=>{
        const rawList = [];
        const days = plan.days || {};
        Object.keys(days).forEach((dayKey)=>{
            const day = days[dayKey];
            [
                'breakfast',
                'lunch',
                'dinner',
                'snack'
            ].forEach((slot)=>{
                const meal = day[slot];
                if (meal && Array.isArray(meal.ingredientsSummary)) {
                    meal.ingredientsSummary.forEach((ing)=>{
                        rawList.push(`${ing} (for ${day.dayOfWeek} ${slot}: ${meal.title})`);
                    });
                }
            });
        });
        if (rawList.length === 0) return 0;
        try {
            const authHeaders = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthHeaders"])();
            const res = await fetch('/api/ai/consolidate-groceries', {
                method: 'POST',
                headers: authHeaders,
                body: JSON.stringify({
                    rawIngredients: rawList,
                    pantryItems: pantry.map((p)=>p.name)
                })
            });
            const data = await res.json();
            let itemsToInsert = [];
            if (data.success && Array.isArray(data.items) && data.items.length > 0) {
                itemsToInsert = data.items;
            } else {
                // Fallback deduplication
                const unique = Array.from(new Set(rawList.map((r)=>r.split(' (for')[0].trim())));
                itemsToInsert = unique.map((name)=>({
                        name,
                        quantity: '1 batch',
                        category: 'Produce'
                    }));
            }
            let added = 0;
            for (const item of itemsToInsert){
                await addGroceryItem({
                    name: item.name,
                    quantity: item.quantity || '1',
                    category: item.category || 'Produce',
                    checked: false,
                    recipeTitle: '7-Day Meal Plan'
                });
                added++;
            }
            return added;
        } catch (e) {
            console.error('Consolidate error:', e);
            return 0;
        }
    };
    const setCurrentPlan = async (plan)=>{
        setCurrentPlanState(plan);
        if (user) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveMealPlanToFirestore"])({
                ...plan,
                userId: user.uid
            });
        } else {
            localStorage.setItem('mealai_current_plan', JSON.stringify(plan));
        }
    };
    const replaceMeal = async (dayKey, mealType, meal)=>{
        if (!currentPlan) return;
        const days = {
            ...currentPlan.days
        };
        const day = {
            ...days[dayKey]
        };
        day[mealType] = meal;
        day.totalCalories = (day.breakfast?.calories || 0) + (day.lunch?.calories || 0) + (day.dinner?.calories || 0) + (day.snack?.calories || 0);
        day.totalProtein = (day.breakfast?.protein || 0) + (day.lunch?.protein || 0) + (day.dinner?.protein || 0) + (day.snack?.protein || 0);
        days[dayKey] = day;
        const newPlan = {
            ...currentPlan,
            days,
            updatedAt: new Date().toISOString()
        };
        await setCurrentPlan(newPlan);
    };
    const removeMeal = async (dayKey, mealType)=>{
        if (!currentPlan) return;
        const days = {
            ...currentPlan.days
        };
        const day = {
            ...days[dayKey]
        };
        delete day[mealType];
        day.totalCalories = (day.breakfast?.calories || 0) + (day.lunch?.calories || 0) + (day.dinner?.calories || 0) + (day.snack?.calories || 0);
        day.totalProtein = (day.breakfast?.protein || 0) + (day.lunch?.protein || 0) + (day.dinner?.protein || 0) + (day.snack?.protein || 0);
        days[dayKey] = day;
        const newPlan = {
            ...currentPlan,
            days,
            updatedAt: new Date().toISOString()
        };
        await setCurrentPlan(newPlan);
    };
    const regenerateSingleMeal = async (dayKey, mealType, currentMealTitle)=>{
        const authHeaders = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthHeaders"])();
        const res = await fetch('/api/ai/regenerate-meal', {
            method: 'POST',
            headers: authHeaders,
            body: JSON.stringify({
                mealType,
                dayOfWeek: currentPlan?.days?.[dayKey]?.dayOfWeek || dayKey,
                currentTitle: currentMealTitle,
                dietaryPreferences: currentPlan?.dietaryTags || [],
                pantryItems: pantry.map((p)=>p.name),
                calorieGoal: currentPlan?.targetCalories,
                proteinGoal: currentPlan?.targetProtein
            })
        });
        const data = await res.json();
        if (!data.success || !data.meal) {
            throw new Error(data.error || 'Failed to regenerate meal');
        }
        await replaceMeal(dayKey, mealType, data.meal);
        return data.meal;
    };
    // Step-by-Step Cooking Mode
    const startCooking = (recipe, startStep = 1)=>{
        setActiveCookingRecipe(recipe);
        setActiveCookingStep(startStep);
    };
    const nextCookingStep = ()=>{
        if (!activeCookingRecipe) return;
        if (activeCookingStep < activeCookingRecipe.instructions.length) {
            setActiveCookingStep((prev)=>prev + 1);
        }
    };
    const prevCookingStep = ()=>{
        if (activeCookingStep > 1) {
            setActiveCookingStep((prev)=>prev - 1);
        }
    };
    const goToCookingStep = (step)=>{
        if (!activeCookingRecipe) return;
        if (step >= 1 && step <= activeCookingRecipe.instructions.length) {
            setActiveCookingStep(step);
        }
    };
    const closeCooking = ()=>{
        setActiveCookingRecipe(null);
    };
    // Search & Filter Catalog
    const searchCatalog = async (filters)=>{
        const results = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCatalogRecipes"])(filters);
        return results;
    };
    // Seed / Sync Catalog Database
    const seedCatalog = async ()=>{
        setIsSeeding(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["seedCatalogDatabaseIfEmpty"])();
            const [recs, ings, tax] = await Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCatalogRecipes"])(),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCatalogIngredients"])(),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCatalogTaxonomies"])()
            ]);
            setCatalogRecipes(recs);
            setCatalogIngredients(ings);
            setCatalogTaxonomies(tax);
        } finally{
            setIsSeeding(false);
        }
    };
    // Calculate Pantry Match for any recipe
    const calculatePantryMatch = (recipe)=>{
        const pantryNames = pantry.map((p)=>p.name);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateRecipePantryMatch"])(recipe, pantryNames);
    };
    // Direct "Add to Meal Plan" from Catalog or Detail view
    const addToMealPlan = async (dayKey, mealType, recipe)=>{
        const plannedMeal = {
            recipeId: recipe.id,
            title: recipe.title,
            description: recipe.description,
            calories: recipe.calories,
            protein: recipe.proteinGrams || recipe.protein,
            timeMinutes: recipe.totalTimeMinutes || recipe.totalTime,
            mealType: mealType === 'snack' ? 'snack' : recipe.mealType || 'dinner',
            cuisine: recipe.cuisine,
            imageUrl: recipe.imageUrl,
            ingredientsSummary: recipe.ingredients.map((i)=>i.name)
        };
        await replaceMeal(dayKey, mealType, plannedMeal);
    };
    const favorites = recipes.filter((r)=>r.isFavorite);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MealContext.Provider, {
        value: {
            recipes,
            catalogRecipes,
            catalogIngredients,
            catalogTaxonomies,
            isSeeding,
            favorites,
            pantry,
            groceryList,
            currentPlan,
            activeCookingRecipe,
            activeCookingStep,
            loadingData,
            saveRecipe,
            deleteRecipe,
            toggleFavorite,
            addPantryItem,
            updatePantryItem,
            removePantryItem,
            addGroceryItem,
            updateGroceryItem,
            toggleGroceryItem,
            removeGroceryItem,
            clearCheckedGroceryItems,
            addRecipeIngredientsToGrocery,
            addWeekToGroceryList,
            setCurrentPlan,
            replaceMeal,
            removeMeal,
            regenerateSingleMeal,
            startCooking,
            nextCookingStep,
            prevCookingStep,
            goToCookingStep,
            closeCooking,
            searchCatalog,
            seedCatalog,
            addToMealPlan,
            calculatePantryMatch
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/MealContext.tsx",
        lineNumber: 732,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(MealProvider, "JA/etbBQuF6zhTV6UX8s8Dmm34o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c2 = MealProvider;
const useMeal = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(MealContext);
    if (!context) {
        throw new Error('useMeal must be used within a MealProvider');
    }
    return context;
};
_s1(useMeal, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "FEATURED_RECIPES$RAW_FEATURED_RECIPES.map");
__turbopack_context__.k.register(_c1, "FEATURED_RECIPES");
__turbopack_context__.k.register(_c2, "MealProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/seedCatalog.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SEED_APPLIANCES",
    ()=>SEED_APPLIANCES,
    "SEED_COOKING_METHODS",
    ()=>SEED_COOKING_METHODS,
    "SEED_CUISINES",
    ()=>SEED_CUISINES,
    "SEED_DIETARY_TAGS",
    ()=>SEED_DIETARY_TAGS,
    "SEED_INGREDIENTS",
    ()=>SEED_INGREDIENTS,
    "SEED_MEAL_TYPES",
    ()=>SEED_MEAL_TYPES,
    "SEED_RECIPES",
    ()=>SEED_RECIPES
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/index.ts [app-client] (ecmascript)");
;
const SEED_CUISINES = [
    {
        id: 'italian',
        name: 'Italian',
        slug: 'italian',
        description: 'Classic pasta, risottos, and Mediterranean herb-infused dishes',
        recipeCount: 8
    },
    {
        id: 'mexican',
        name: 'Mexican',
        slug: 'mexican',
        description: 'Vibrant spices, citrus, tacos, and slow-braised meats',
        recipeCount: 7
    },
    {
        id: 'japanese',
        name: 'Japanese',
        slug: 'japanese',
        description: 'Umami-rich, clean, precise bowls, teriyaki, and broths',
        recipeCount: 6
    },
    {
        id: 'indian',
        name: 'Indian',
        slug: 'indian',
        description: 'Aromatic curries, rich spices, tikkas, and lentils',
        recipeCount: 1150
    },
    {
        id: 'mediterranean',
        name: 'Mediterranean',
        slug: 'mediterranean',
        description: 'Fresh produce, healthy olive oils, feta, and seafood',
        recipeCount: 8
    },
    {
        id: 'thai',
        name: 'Thai',
        slug: 'thai',
        description: 'Sweet, sour, salty, and spicy balance with coconut and herbs',
        recipeCount: 5
    },
    {
        id: 'american',
        name: 'American',
        slug: 'american',
        description: 'Comfort food classics, hearty roasts, and grill specialties',
        recipeCount: 6
    },
    {
        id: 'chinese',
        name: 'Chinese',
        slug: 'chinese',
        description: 'Wok-seared stir fries, dumplings, and ginger scallion sauces',
        recipeCount: 5
    },
    {
        id: 'korean',
        name: 'Korean',
        slug: 'korean',
        description: 'Gochujang heat, sesame depth, and savory-sweet marinades',
        recipeCount: 5
    },
    {
        id: 'middle-eastern',
        name: 'Middle Eastern',
        slug: 'middle-eastern',
        description: 'Shawarma, tahini, za\'atar, fresh herbs, and pita',
        recipeCount: 5
    },
    {
        id: 'french',
        name: 'French',
        slug: 'french',
        description: 'Rich butter sauces, delicate aromatics, and bistro classics',
        recipeCount: 4
    },
    {
        id: 'greek',
        name: 'Greek',
        slug: 'greek',
        description: 'Lemon-herb marinades, crisp salads, tzatziki, and souvlaki',
        recipeCount: 5
    },
    {
        id: 'spanish',
        name: 'Spanish',
        slug: 'spanish',
        description: 'Smoked paprika, tapas, saffron garlic sauces, and paella',
        recipeCount: 4
    }
];
const SEED_MEAL_TYPES = [
    {
        id: 'breakfast',
        name: 'Breakfast',
        slug: 'breakfast',
        description: 'Energizing morning meals, bowls, and scrambles'
    },
    {
        id: 'brunch',
        name: 'Brunch',
        slug: 'brunch',
        description: 'Hearty weekend morning and midday spreads'
    },
    {
        id: 'lunch',
        name: 'Lunch',
        slug: 'lunch',
        description: 'Balanced, quick, and satisfying midday fuel'
    },
    {
        id: 'dinner',
        name: 'Dinner',
        slug: 'dinner',
        description: 'Rich, complete evening mains and family suppers'
    },
    {
        id: 'snack',
        name: 'Snack',
        slug: 'snack',
        description: 'High-protein and revitalizing quick bites'
    },
    {
        id: 'dessert',
        name: 'Dessert',
        slug: 'dessert',
        description: 'Sweet treats, fruit crumbles, and guilt-free delights'
    },
    {
        id: 'appetizer',
        name: 'Appetizer',
        slug: 'appetizer',
        description: 'Crispy starters, skewers, and sharing plates'
    }
];
const SEED_DIETARY_TAGS = [
    {
        id: 'high-protein',
        name: 'High-Protein',
        slug: 'high-protein',
        description: '30g+ protein per serving'
    },
    {
        id: 'vegetarian',
        name: 'Vegetarian',
        slug: 'vegetarian',
        description: 'Meat-free dishes with wholesome vegetables and dairy'
    },
    {
        id: 'vegan',
        name: 'Vegan',
        slug: 'vegan',
        description: '100% plant-based with zero animal products'
    },
    {
        id: 'gluten-free',
        name: 'Gluten-Free',
        slug: 'gluten-free',
        description: 'Formulated with no wheat, rye, barley, or gluten'
    },
    {
        id: 'dairy-free',
        name: 'Dairy-Free',
        slug: 'dairy-free',
        description: 'Made without milk, butter, cheese, or lactose'
    },
    {
        id: 'keto',
        name: 'Keto',
        slug: 'keto',
        description: 'Under 10g net carbs, high healthy fats'
    },
    {
        id: 'low-carb',
        name: 'Low-Carb',
        slug: 'low-carb',
        description: 'Balanced low-glycemic carbohydrates under 25g'
    },
    {
        id: 'pescatarian',
        name: 'Pescatarian',
        slug: 'pescatarian',
        description: 'Seafood and plant-forward combinations'
    },
    {
        id: 'nut-free',
        name: 'Nut-Free',
        slug: 'nut-free',
        description: 'Contains no tree nuts or peanuts'
    },
    {
        id: 'halal',
        name: 'Halal',
        slug: 'halal',
        description: 'Conforming to halal dietary guidelines'
    }
];
const SEED_APPLIANCES = [
    {
        id: 'air-fryer',
        name: 'Air Fryer',
        slug: 'air-fryer',
        description: 'Fast, ultra-crispy hot air circulation'
    },
    {
        id: 'stovetop',
        name: 'Stovetop',
        slug: 'stovetop',
        description: 'Skillets, Dutch ovens, and sauté pans'
    },
    {
        id: 'oven',
        name: 'Oven',
        slug: 'oven',
        description: 'Roasting, baking, and broiling'
    },
    {
        id: 'instant-pot',
        name: 'Instant Pot',
        slug: 'instant-pot',
        description: 'High-speed pressure cooking and braising'
    },
    {
        id: 'slow-cooker',
        name: 'Slow Cooker',
        slug: 'slow-cooker',
        description: 'Gentle, tenderizing all-day simmering'
    },
    {
        id: 'blender',
        name: 'Blender',
        slug: 'blender',
        description: 'Smoothies, velvety sauces, and purées'
    },
    {
        id: 'grill',
        name: 'Grill',
        slug: 'grill',
        description: 'Open flame searing and smoky char'
    }
];
const SEED_COOKING_METHODS = [
    'Air fry',
    'Sauté',
    'Roast',
    'Bake',
    'Grill',
    'Pressure cook',
    'Slow cook',
    'Steam',
    'Boil',
    'Raw / Toss'
];
const SEED_INGREDIENTS = [
    {
        id: 'ing_chicken_breast',
        name: 'Chicken Breast',
        aliases: [
            'chicken breasts',
            'boneless skinless chicken breast',
            'diced chicken',
            'chicken fillet'
        ],
        category: 'protein',
        commonUnits: [
            'g',
            'oz',
            'lb',
            'pieces'
        ],
        dietaryTags: [
            'High-Protein',
            'Gluten-Free',
            'Dairy-Free',
            'Keto',
            'Halal'
        ],
        allergens: [],
        substitutions: [
            'ing_tofu',
            'ing_turkey_breast',
            'ing_salmon_fillet'
        ],
        searchableText: 'chicken breast poultry meat protein boneless'
    },
    {
        id: 'ing_salmon_fillet',
        name: 'Salmon Fillet',
        aliases: [
            'salmon',
            'fresh salmon',
            'atlantic salmon',
            'wild salmon'
        ],
        category: 'protein',
        commonUnits: [
            'g',
            'oz',
            'fillets'
        ],
        dietaryTags: [
            'High-Protein',
            'Pescatarian',
            'Gluten-Free',
            'Dairy-Free',
            'Keto'
        ],
        allergens: [
            'Fish'
        ],
        substitutions: [
            'ing_cod_fillet',
            'ing_shrimp',
            'ing_trout'
        ],
        searchableText: 'salmon fish seafood omega3 protein fillet'
    },
    {
        id: 'ing_shrimp',
        name: 'Shrimp',
        aliases: [
            'prawns',
            'raw shrimp',
            'jumbo shrimp',
            'peeled deveined shrimp'
        ],
        category: 'protein',
        commonUnits: [
            'g',
            'oz',
            'lb',
            'pieces'
        ],
        dietaryTags: [
            'High-Protein',
            'Pescatarian',
            'Gluten-Free',
            'Dairy-Free',
            'Keto'
        ],
        allergens: [
            'Shellfish'
        ],
        substitutions: [
            'ing_scallops',
            'ing_firm_tofu',
            'ing_chicken_breast'
        ],
        searchableText: 'shrimp prawns seafood shellfish protein'
    },
    {
        id: 'ing_eggs',
        name: 'Eggs',
        aliases: [
            'egg',
            'large eggs',
            'egg whites',
            'whole egg'
        ],
        category: 'dairy',
        commonUnits: [
            'whole',
            'egg whites',
            'carton'
        ],
        dietaryTags: [
            'High-Protein',
            'Vegetarian',
            'Gluten-Free',
            'Keto'
        ],
        allergens: [
            'Egg'
        ],
        substitutions: [
            'ing_tofu',
            'ing_flax_egg'
        ],
        searchableText: 'eggs egg protein dairy breakfast scramble'
    },
    {
        id: 'ing_greek_yogurt',
        name: 'Greek Yogurt',
        aliases: [
            'plain greek yogurt',
            'nonfat greek yogurt',
            'strained yogurt'
        ],
        category: 'dairy',
        commonUnits: [
            'cup',
            'g',
            'tbsp'
        ],
        dietaryTags: [
            'High-Protein',
            'Vegetarian',
            'Gluten-Free'
        ],
        allergens: [
            'Milk'
        ],
        substitutions: [
            'ing_coconut_yogurt',
            'ing_sour_cream',
            'ing_cottage_cheese'
        ],
        searchableText: 'greek yogurt dairy protein probiotic breakfast'
    },
    {
        id: 'ing_tofu',
        name: 'Firm Tofu',
        aliases: [
            'tofu',
            'extra firm tofu',
            'bean curd'
        ],
        category: 'protein',
        commonUnits: [
            'block',
            'g',
            'oz'
        ],
        dietaryTags: [
            'Vegan',
            'Vegetarian',
            'High-Protein',
            'Dairy-Free',
            'Gluten-Free'
        ],
        allergens: [
            'Soy'
        ],
        substitutions: [
            'ing_tempeh',
            'ing_edamame',
            'ing_chicken_breast'
        ],
        searchableText: 'firm tofu bean curd plant protein vegan soy'
    },
    {
        id: 'ing_tomatoes',
        name: 'Tomato',
        aliases: [
            'tomatoes',
            'fresh tomato',
            'chopped tomato',
            'cherry tomatoes',
            'roma tomatoes'
        ],
        category: 'produce',
        commonUnits: [
            'whole',
            'cup',
            'g',
            'pieces'
        ],
        dietaryTags: [
            'Vegan',
            'Vegetarian',
            'Gluten-Free',
            'Dairy-Free',
            'Low-Carb'
        ],
        allergens: [],
        substitutions: [
            'ing_canned_tomatoes',
            'ing_red_bell_pepper'
        ],
        searchableText: 'tomato tomatoes produce vegetable cherry roma fresh'
    },
    {
        id: 'ing_garlic',
        name: 'Garlic',
        aliases: [
            'garlic cloves',
            'minced garlic',
            'fresh garlic',
            'crushed garlic'
        ],
        category: 'spice',
        commonUnits: [
            'cloves',
            'tsp',
            'tbsp',
            'heads'
        ],
        dietaryTags: [
            'Vegan',
            'Vegetarian',
            'Gluten-Free',
            'Dairy-Free'
        ],
        allergens: [],
        substitutions: [
            'ing_garlic_powder',
            'ing_shallots'
        ],
        searchableText: 'garlic clove cloves aromatics allium seasoning'
    },
    {
        id: 'ing_onion',
        name: 'Onion',
        aliases: [
            'onions',
            'yellow onion',
            'red onion',
            'diced onion'
        ],
        category: 'produce',
        commonUnits: [
            'whole',
            'medium',
            'cup',
            'g'
        ],
        dietaryTags: [
            'Vegan',
            'Vegetarian',
            'Gluten-Free',
            'Dairy-Free'
        ],
        allergens: [],
        substitutions: [
            'ing_shallots',
            'ing_leeks',
            'ing_scallions'
        ],
        searchableText: 'onion yellow red sweet allium aromatics'
    },
    {
        id: 'ing_olive_oil',
        name: 'Olive Oil',
        aliases: [
            'extra virgin olive oil',
            'evoo',
            'pure olive oil'
        ],
        category: 'oil',
        commonUnits: [
            'tbsp',
            'tsp',
            'ml'
        ],
        dietaryTags: [
            'Vegan',
            'Vegetarian',
            'Gluten-Free',
            'Dairy-Free',
            'Keto'
        ],
        allergens: [],
        substitutions: [
            'ing_avocado_oil',
            'ing_canola_oil',
            'ing_butter'
        ],
        searchableText: 'olive oil evoo healthy fats cooking oil dressing'
    },
    {
        id: 'ing_spinach',
        name: 'Baby Spinach',
        aliases: [
            'spinach',
            'fresh spinach',
            'baby greens'
        ],
        category: 'produce',
        commonUnits: [
            'cup',
            'handful',
            'g',
            'oz'
        ],
        dietaryTags: [
            'Vegan',
            'Vegetarian',
            'Gluten-Free',
            'Dairy-Free',
            'Keto'
        ],
        allergens: [],
        substitutions: [
            'ing_kale',
            'ing_arugula',
            'ing_swiss_chard'
        ],
        searchableText: 'spinach baby greens vegetable salad produce iron'
    },
    {
        id: 'ing_avocado',
        name: 'Avocado',
        aliases: [
            'avocados',
            'hass avocado',
            'ripe avocado'
        ],
        category: 'produce',
        commonUnits: [
            'whole',
            'half',
            'slice'
        ],
        dietaryTags: [
            'Vegan',
            'Vegetarian',
            'Gluten-Free',
            'Dairy-Free',
            'Keto'
        ],
        allergens: [],
        substitutions: [
            'ing_olive_oil',
            'ing_tahini',
            'ing_hummus'
        ],
        searchableText: 'avocado healthy fat hass produce salad guacamole'
    },
    {
        id: 'ing_rice',
        name: 'Basmati Rice',
        aliases: [
            'white rice',
            'jasmine rice',
            'steamed rice',
            'cooked rice'
        ],
        category: 'grain',
        commonUnits: [
            'cup',
            'g'
        ],
        dietaryTags: [
            'Vegetarian',
            'Vegan',
            'Gluten-Free',
            'Dairy-Free'
        ],
        allergens: [],
        substitutions: [
            'ing_brown_rice',
            'ing_quinoa',
            'ing_cauliflower_rice'
        ],
        searchableText: 'rice basmati jasmine white grain carbs bowl'
    },
    {
        id: 'ing_quinoa',
        name: 'Quinoa',
        aliases: [
            'cooked quinoa',
            'white quinoa',
            'tri-color quinoa'
        ],
        category: 'grain',
        commonUnits: [
            'cup',
            'g'
        ],
        dietaryTags: [
            'High-Protein',
            'Vegan',
            'Vegetarian',
            'Gluten-Free',
            'Dairy-Free'
        ],
        allergens: [],
        substitutions: [
            'ing_brown_rice',
            'ing_couscous',
            'ing_farro'
        ],
        searchableText: 'quinoa ancient grain complete protein superfood'
    },
    {
        id: 'ing_feta_cheese',
        name: 'Feta Cheese',
        aliases: [
            'feta',
            'crumbled feta',
            'greek feta'
        ],
        category: 'dairy',
        commonUnits: [
            'g',
            'oz',
            'tbsp',
            'cup'
        ],
        dietaryTags: [
            'Vegetarian',
            'Gluten-Free',
            'Keto'
        ],
        allergens: [
            'Milk'
        ],
        substitutions: [
            'ing_goat_cheese',
            'ing_parmesan',
            'ing_vegan_feta'
        ],
        searchableText: 'feta cheese greek cheese sheep goat tangy dairy'
    },
    {
        id: 'ing_black_beans',
        name: 'Black Beans',
        aliases: [
            'canned black beans',
            'cooked black beans',
            'frijoles negros'
        ],
        category: 'legume',
        commonUnits: [
            'can',
            'cup',
            'g'
        ],
        dietaryTags: [
            'High-Protein',
            'Vegan',
            'Vegetarian',
            'Gluten-Free',
            'Dairy-Free'
        ],
        allergens: [],
        substitutions: [
            'ing_pinto_beans',
            'ing_chickpeas',
            'ing_kidney_beans'
        ],
        searchableText: 'black beans legume fiber plant protein mexican'
    },
    {
        id: 'ing_parmesan',
        name: 'Parmesan Cheese',
        aliases: [
            'parmigiano reggiano',
            'grated parmesan',
            'shaved parmesan'
        ],
        category: 'dairy',
        commonUnits: [
            'tbsp',
            'cup',
            'g',
            'oz'
        ],
        dietaryTags: [
            'Gluten-Free',
            'Keto'
        ],
        allergens: [
            'Milk'
        ],
        substitutions: [
            'ing_pecorino',
            'ing_nutritional_yeast'
        ],
        searchableText: 'parmesan parmigiano cheese italian umami savory'
    },
    {
        id: 'ing_pasta',
        name: 'Pasta',
        aliases: [
            'spaghetti',
            'penne',
            'rigatoni',
            'fusilli',
            'linguine'
        ],
        category: 'grain',
        commonUnits: [
            'g',
            'oz',
            'cup'
        ],
        dietaryTags: [
            'Vegetarian',
            'Dairy-Free'
        ],
        allergens: [
            'Gluten',
            'Wheat'
        ],
        substitutions: [
            'ing_gf_pasta',
            'ing_zucchini_noodles',
            'ing_chickpea_pasta'
        ],
        searchableText: 'pasta spaghetti penne noodles grain carbs italian'
    },
    {
        id: 'ing_bell_pepper',
        name: 'Bell Pepper',
        aliases: [
            'bell peppers',
            'red bell pepper',
            'green pepper',
            'sweet pepper'
        ],
        category: 'produce',
        commonUnits: [
            'whole',
            'sliced',
            'cup'
        ],
        dietaryTags: [
            'Vegan',
            'Vegetarian',
            'Gluten-Free',
            'Dairy-Free',
            'Low-Carb'
        ],
        allergens: [],
        substitutions: [
            'ing_poblano_pepper',
            'ing_zucchini'
        ],
        searchableText: 'bell pepper red green yellow sweet capsicum produce'
    },
    {
        id: 'ing_soy_sauce',
        name: 'Soy Sauce',
        aliases: [
            'tamari',
            'low sodium soy sauce',
            'shoyu'
        ],
        category: 'sauce',
        commonUnits: [
            'tbsp',
            'tsp',
            'ml'
        ],
        dietaryTags: [
            'Vegan',
            'Vegetarian',
            'Dairy-Free'
        ],
        allergens: [
            'Soy',
            'Gluten'
        ],
        substitutions: [
            'ing_tamari',
            'ing_coconut_aminos'
        ],
        searchableText: 'soy sauce tamari shoyu umami asian seasoning'
    }
];
// ---------------- MASTER RECIPE DATABASE (50+ PRODUCTION RECIPES) ----------------
const RAW_SEED_RECIPES = [
    // 1. Air Fryer Lemon Herb Chicken & Crispy Potatoes
    {
        id: 'rec_catalog_01',
        title: 'Air Fryer Lemon Herb Crispy Chicken & Baby Potatoes',
        slug: 'air-fryer-lemon-herb-crispy-chicken-baby-potatoes',
        description: 'Juicy golden air-fried chicken breast tenderloins paired with crackly rosemary baby potatoes and zesty charred lemon juice.',
        cuisine: 'Mediterranean',
        region: 'Greek Islands',
        mealType: 'dinner',
        mealTypes: [
            'dinner',
            'lunch'
        ],
        difficulty: 'easy',
        prepTime: 10,
        cookTime: 18,
        totalTime: 28,
        prepTimeMinutes: 10,
        cookTimeMinutes: 18,
        totalTimeMinutes: 28,
        servings: 2,
        calories: 460,
        protein: 42,
        carbs: 34,
        fat: 14,
        fiber: 5,
        proteinGrams: 42,
        carbohydratesGrams: 34,
        fatGrams: 14,
        fiberGrams: 5,
        dietary: [
            'High-Protein',
            'Gluten-Free',
            'Dairy-Free'
        ],
        dietaryTags: [
            'High-Protein',
            'Gluten-Free',
            'Dairy-Free'
        ],
        allergens: [],
        appliances: [
            'Air Fryer'
        ],
        applianceTags: [
            'Air Fryer'
        ],
        cookingMethods: [
            'Air fry'
        ],
        tags: [
            'chicken',
            'crispy',
            'under-30-min',
            'potatoes',
            'lemon-herb'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1000&q=80',
        ingredients: [
            {
                name: 'Chicken Breast',
                amount: '400',
                unit: 'g',
                category: 'Protein',
                note: 'cut into thick tender strips'
            },
            {
                name: 'Baby Gold Potatoes',
                amount: '300',
                unit: 'g',
                category: 'Produce',
                note: 'halved'
            },
            {
                name: 'Olive Oil',
                amount: '1.5',
                unit: 'tbsp',
                category: 'Pantry'
            },
            {
                name: 'Lemon',
                amount: '1',
                unit: 'whole',
                category: 'Produce',
                note: 'juiced and zested'
            },
            {
                name: 'Dried Oregano & Rosemary',
                amount: '1',
                unit: 'tsp',
                category: 'Pantry'
            },
            {
                name: 'Garlic Powder',
                amount: '1',
                unit: 'tsp',
                category: 'Pantry'
            },
            {
                name: 'Salt & Black Pepper',
                amount: '0.5',
                unit: 'tsp',
                category: 'Pantry'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Season the Potatoes',
                instruction: 'Toss halved baby potatoes with 1 tbsp olive oil, rosemary, garlic powder, salt, and pepper.',
                timerMinutes: 2
            },
            {
                step: 2,
                title: 'Preheat & First Cook',
                instruction: 'Preheat air fryer to 400°F (200°C). Air fry potatoes for 8 minutes, shaking halfway.',
                timerMinutes: 8,
                tip: 'Spacing the potatoes ensures a crispy skin.'
            },
            {
                step: 3,
                title: 'Season & Add Chicken',
                instruction: 'Coat chicken strips in remaining olive oil, oregano, lemon zest, and lemon juice. Add to basket with potatoes.',
                timerMinutes: 2
            },
            {
                step: 4,
                title: 'Final Air Fry',
                instruction: 'Air fry together at 390°F (195°C) for 10 minutes until chicken reaches 165°F (74°C) internal and potatoes are fork-tender.',
                timerMinutes: 10
            }
        ],
        tips: [
            'Rest chicken for 3 minutes before slicing to lock in all juices.',
            'Squeeze extra fresh lemon right before serving.'
        ],
        substitutions: [
            {
                originalIngredient: 'Baby Gold Potatoes',
                substituteIngredient: 'Sweet Potato cubes',
                ratio: '1:1',
                notes: 'Slightly sweeter profile with extra beta-carotene.'
            },
            {
                originalIngredient: 'Chicken Breast',
                substituteIngredient: 'Firm Tofu pressed',
                ratio: '1:1',
                notes: 'Reduces cooking time to 12 minutes total.'
            }
        ],
        sourceType: 'seed',
        isPublic: true
    },
    // 2. Spicy Black Bean & Avocado Breakfast Tacos
    {
        id: 'rec_catalog_02',
        title: 'Spicy Black Bean & Avocado Breakfast Tacos',
        slug: 'spicy-black-bean-avocado-breakfast-tacos',
        description: 'Warm corn tortillas packed with fluffy scrambled eggs, cumin-spiced black beans, creamy avocado slices, and fiery pico de gallo.',
        cuisine: 'Mexican',
        region: 'Baja',
        mealType: 'breakfast',
        mealTypes: [
            'breakfast',
            'brunch',
            'lunch'
        ],
        difficulty: 'beginner',
        prepTime: 8,
        cookTime: 7,
        totalTime: 15,
        prepTimeMinutes: 8,
        cookTimeMinutes: 7,
        totalTimeMinutes: 15,
        servings: 2,
        calories: 390,
        protein: 22,
        carbs: 36,
        fat: 16,
        fiber: 9,
        proteinGrams: 22,
        carbohydratesGrams: 36,
        fatGrams: 16,
        fiberGrams: 9,
        dietary: [
            'Vegetarian',
            'High-Protein',
            'Gluten-Free'
        ],
        dietaryTags: [
            'Vegetarian',
            'High-Protein',
            'Gluten-Free'
        ],
        allergens: [
            'Egg'
        ],
        appliances: [
            'Stovetop'
        ],
        applianceTags: [
            'Stovetop'
        ],
        cookingMethods: [
            'Sauté'
        ],
        tags: [
            'tacos',
            'breakfast',
            'eggs',
            'black-beans',
            'avocado',
            'mexican'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=80',
        ingredients: [
            {
                name: 'Eggs',
                amount: '4',
                unit: 'large',
                category: 'Dairy & Eggs'
            },
            {
                name: 'Corn Tortillas',
                amount: '4',
                unit: 'small',
                category: 'Pantry'
            },
            {
                name: 'Canned Black Beans',
                amount: '0.75',
                unit: 'cup',
                category: 'Pantry',
                note: 'rinsed and drained'
            },
            {
                name: 'Avocado',
                amount: '1',
                unit: 'medium',
                category: 'Produce',
                note: 'sliced'
            },
            {
                name: 'Ground Cumin & Chili Powder',
                amount: '0.5',
                unit: 'tsp',
                category: 'Pantry'
            },
            {
                name: 'Salsa / Pico de Gallo',
                amount: '0.25',
                unit: 'cup',
                category: 'Condiments'
            },
            {
                name: 'Fresh Cilantro',
                amount: '2',
                unit: 'tbsp',
                category: 'Produce',
                note: 'chopped'
            },
            {
                name: 'Olive Oil',
                amount: '1',
                unit: 'tsp',
                category: 'Pantry'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Warm the Beans',
                instruction: 'Heat olive oil in a small skillet over medium heat. Add black beans, cumin, and chili powder with a pinch of salt. Warm for 3 minutes and lightly mash.',
                timerMinutes: 3
            },
            {
                step: 2,
                title: 'Scramble the Eggs',
                instruction: 'Whisk eggs with a pinch of salt and black pepper. Pour into a non-stick pan over medium-low heat, stirring gently until softly set and creamy.',
                timerMinutes: 3,
                tip: 'Remove pan from heat slightly before fully dry.'
            },
            {
                step: 3,
                title: 'Warm Tortillas',
                instruction: 'Toast corn tortillas directly on a warm dry skillet for 30 seconds per side until pliable and lightly charred.',
                timerMinutes: 1
            },
            {
                step: 4,
                title: 'Assemble & Garnish',
                instruction: 'Layer tortillas with spiced black beans, soft scrambled eggs, fresh avocado slices, salsa, and cilantro.',
                timerMinutes: 1
            }
        ],
        tips: [
            'Warm tortillas directly over gas flame for authentic street taco char.'
        ],
        substitutions: [
            {
                originalIngredient: 'Eggs',
                substituteIngredient: 'Scrambled Turmeric Tofu',
                ratio: '1:1',
                notes: 'Makes this 100% vegan.'
            },
            {
                originalIngredient: 'Corn Tortillas',
                substituteIngredient: 'Butter lettuce cups',
                ratio: '1:1',
                notes: 'Ultra low-carb keto variant.'
            }
        ],
        sourceType: 'seed',
        isPublic: true
    },
    // 3. Garlic Butter Seared Salmon with Lemon Asparagus
    {
        id: 'rec_catalog_03',
        title: 'Garlic Butter Seared Salmon with Lemon Asparagus',
        slug: 'garlic-butter-seared-salmon-with-lemon-asparagus',
        description: 'Crispy skin salmon fillets basted in golden garlic butter alongside tender-crisp skillet asparagus and lemon zest.',
        cuisine: 'American',
        region: 'Pacific Northwest',
        mealType: 'dinner',
        mealTypes: [
            'dinner',
            'lunch'
        ],
        difficulty: 'easy',
        prepTime: 7,
        cookTime: 12,
        totalTime: 19,
        prepTimeMinutes: 7,
        cookTimeMinutes: 12,
        totalTimeMinutes: 19,
        servings: 2,
        calories: 520,
        protein: 44,
        carbs: 8,
        fat: 32,
        fiber: 4,
        proteinGrams: 44,
        carbohydratesGrams: 8,
        fatGrams: 32,
        fiberGrams: 4,
        dietary: [
            'High-Protein',
            'Keto',
            'Gluten-Free',
            'Low-Carb',
            'Pescatarian'
        ],
        dietaryTags: [
            'High-Protein',
            'Keto',
            'Gluten-Free',
            'Low-Carb',
            'Pescatarian'
        ],
        allergens: [
            'Fish',
            'Milk'
        ],
        appliances: [
            'Stovetop'
        ],
        applianceTags: [
            'Stovetop'
        ],
        cookingMethods: [
            'Sauté'
        ],
        tags: [
            'salmon',
            'keto',
            'asparagus',
            'garlic-butter',
            'seafood',
            'under-20-min'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80',
        ingredients: [
            {
                name: 'Salmon Fillets',
                amount: '2',
                unit: 'fillets (approx 350g)',
                category: 'Protein',
                note: 'skin-on, patted dry'
            },
            {
                name: 'Fresh Asparagus',
                amount: '250',
                unit: 'g',
                category: 'Produce',
                note: 'woody ends snapped off'
            },
            {
                name: 'Butter',
                amount: '2',
                unit: 'tbsp',
                category: 'Dairy & Eggs'
            },
            {
                name: 'Garlic',
                amount: '3',
                unit: 'cloves',
                category: 'Produce',
                note: 'finely minced'
            },
            {
                name: 'Olive Oil',
                amount: '1',
                unit: 'tbsp',
                category: 'Pantry'
            },
            {
                name: 'Lemon',
                amount: '0.5',
                unit: 'whole',
                category: 'Produce',
                note: 'cut into wedges'
            },
            {
                name: 'Sea Salt & Cracked Pepper',
                amount: '0.5',
                unit: 'tsp',
                category: 'Pantry'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Prep Salmon Skin',
                instruction: 'Thoroughly pat salmon skin dry with paper towels. Season both sides with sea salt and cracked black pepper.',
                timerMinutes: 2,
                tip: 'Dry skin is the master secret to crackling crispy salmon.'
            },
            {
                step: 2,
                title: 'Sear Salmon Skin-Down',
                instruction: 'Heat olive oil in a heavy stainless or cast-iron skillet over medium-high heat until shimmering. Place salmon skin-side down and press gently with spatula for 10 seconds. Cook undisturbed for 5 minutes.',
                timerMinutes: 5
            },
            {
                step: 3,
                title: 'Flip & Add Aromatics',
                instruction: 'Carefully flip salmon. Add butter, minced garlic, and trimmed asparagus around the fish. Sauté asparagus while spooning foamy garlic butter over salmon for 4 minutes.',
                timerMinutes: 4
            },
            {
                step: 4,
                title: 'Lemon Finish',
                instruction: 'Squeeze fresh lemon juice into the sizzling pan. Transfer salmon and asparagus to warm plates and pour pan juices on top.',
                timerMinutes: 1
            }
        ],
        tips: [
            'Do not touch salmon during the first 5 minutes to prevent sticking.'
        ],
        substitutions: [
            {
                originalIngredient: 'Butter',
                substituteIngredient: 'Ghee or Olive Oil',
                ratio: '1:1',
                notes: '100% Dairy-Free version.'
            },
            {
                originalIngredient: 'Asparagus',
                substituteIngredient: 'Broccolini or Green Beans',
                ratio: '1:1',
                notes: 'Equally delicious crisp green vegetable.'
            }
        ],
        sourceType: 'seed',
        isPublic: true
    },
    // 4. Creamy Tuscan Garlic Shrimp Pasta
    {
        id: 'rec_catalog_04',
        title: 'Creamy Tuscan Garlic Shrimp Pasta',
        slug: 'creamy-tuscan-garlic-shrimp-pasta',
        description: 'Plump succulent shrimp, blistered sun-dried tomatoes, and tender baby spinach swimming in a silky garlic parmesan cream sauce over al dente fettuccine.',
        cuisine: 'Italian',
        region: 'Tuscany',
        mealType: 'dinner',
        mealTypes: [
            'dinner'
        ],
        difficulty: 'intermediate',
        prepTime: 12,
        cookTime: 16,
        totalTime: 28,
        prepTimeMinutes: 12,
        cookTimeMinutes: 16,
        totalTimeMinutes: 28,
        servings: 2,
        calories: 590,
        protein: 38,
        carbs: 48,
        fat: 26,
        fiber: 5,
        proteinGrams: 38,
        carbohydratesGrams: 48,
        fatGrams: 26,
        fiberGrams: 5,
        dietary: [
            'Pescatarian',
            'High-Protein'
        ],
        dietaryTags: [
            'Pescatarian',
            'High-Protein'
        ],
        allergens: [
            'Shellfish',
            'Milk',
            'Wheat',
            'Gluten'
        ],
        appliances: [
            'Stovetop'
        ],
        applianceTags: [
            'Stovetop'
        ],
        cookingMethods: [
            'Sauté',
            'Boil'
        ],
        tags: [
            'pasta',
            'shrimp',
            'tuscan',
            'parmesan',
            'spinach',
            'italian'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281724?auto=format&fit=crop&w=1000&q=80',
        ingredients: [
            {
                name: 'Shrimp',
                amount: '350',
                unit: 'g',
                category: 'Protein',
                note: 'peeled and deveined'
            },
            {
                name: 'Fettuccine or Penne',
                amount: '180',
                unit: 'g',
                category: 'Pantry'
            },
            {
                name: 'Baby Spinach',
                amount: '2',
                unit: 'cups',
                category: 'Produce'
            },
            {
                name: 'Sun-Dried Tomatoes',
                amount: '0.33',
                unit: 'cup',
                category: 'Pantry',
                note: 'drained and sliced'
            },
            {
                name: 'Garlic',
                amount: '4',
                unit: 'cloves',
                category: 'Produce',
                note: 'finely minced'
            },
            {
                name: 'Heavy Cream or Half & Half',
                amount: '0.75',
                unit: 'cup',
                category: 'Dairy & Eggs'
            },
            {
                name: 'Parmesan Cheese',
                amount: '0.33',
                unit: 'cup',
                category: 'Dairy & Eggs',
                note: 'freshly grated'
            },
            {
                name: 'Olive Oil',
                amount: '1',
                unit: 'tbsp',
                category: 'Pantry'
            },
            {
                name: 'Italian Herb Seasoning',
                amount: '1',
                unit: 'tsp',
                category: 'Pantry'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Boil Pasta',
                instruction: 'Bring a large pot of salted water to boil. Cook fettuccine until al dente (approx 9 mins). Reserve 1/4 cup pasta water, then drain.',
                timerMinutes: 9
            },
            {
                step: 2,
                title: 'Sear Shrimp',
                instruction: 'Heat olive oil in a wide skillet over high heat. Sear seasoned shrimp for 1.5 minutes per side until pink and opaque. Transfer to a plate.',
                timerMinutes: 3
            },
            {
                step: 3,
                title: 'Build Tuscan Sauce',
                instruction: 'Lower heat to medium. Add minced garlic, sun-dried tomatoes, and Italian herbs. Sauté for 1 minute until fragrant. Pour in cream and simmer gently for 2 minutes.',
                timerMinutes: 3
            },
            {
                step: 4,
                title: 'Melt Cheese & Spinach',
                instruction: 'Stir in parmesan cheese and fresh spinach until wilted and sauce is smooth. Fold in cooked pasta, seared shrimp, and a splash of reserved pasta water.',
                timerMinutes: 2
            }
        ],
        tips: [
            'Freshly grated parmesan melts much silkier than pre-shredded cheese with anti-caking starches.'
        ],
        substitutions: [
            {
                originalIngredient: 'Fettuccine',
                substituteIngredient: 'Gluten-Free Penne or Zucchini Noodles',
                ratio: '1:1',
                notes: 'Enables gluten-free or low-carb diet.'
            },
            {
                originalIngredient: 'Heavy Cream',
                substituteIngredient: 'Coconut Cream with Nutritional Yeast',
                ratio: '1:1',
                notes: 'Dairy-free substitution.'
            }
        ],
        sourceType: 'seed',
        isPublic: true
    },
    // 5. High-Protein Japanese Chicken Teriyaki Rice Bowl
    {
        id: 'rec_catalog_05',
        title: 'High-Protein Japanese Chicken Teriyaki Rice Bowl',
        slug: 'high-protein-japanese-chicken-teriyaki-rice-bowl',
        description: 'Glazed pan-caramelized chicken thigh or breast tossed in homemade ginger-mirin teriyaki sauce served over steamed basmati with edamame and sesame.',
        cuisine: 'Japanese',
        region: 'Tokyo',
        mealType: 'lunch',
        mealTypes: [
            'lunch',
            'dinner'
        ],
        difficulty: 'easy',
        prepTime: 10,
        cookTime: 14,
        totalTime: 24,
        prepTimeMinutes: 10,
        cookTimeMinutes: 14,
        totalTimeMinutes: 24,
        servings: 2,
        calories: 510,
        protein: 46,
        carbs: 52,
        fat: 12,
        fiber: 6,
        proteinGrams: 46,
        carbohydratesGrams: 52,
        fatGrams: 12,
        fiberGrams: 6,
        dietary: [
            'High-Protein',
            'Dairy-Free'
        ],
        dietaryTags: [
            'High-Protein',
            'Dairy-Free'
        ],
        allergens: [
            'Soy'
        ],
        appliances: [
            'Stovetop'
        ],
        applianceTags: [
            'Stovetop'
        ],
        cookingMethods: [
            'Sauté'
        ],
        tags: [
            'teriyaki',
            'chicken',
            'japanese',
            'high-protein',
            'rice-bowl',
            'meal-prep'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1000&q=80',
        ingredients: [
            {
                name: 'Chicken Breast or Thighs',
                amount: '400',
                unit: 'g',
                category: 'Protein',
                note: 'cut into bite-sized pieces'
            },
            {
                name: 'Basmati or Jasmine Rice',
                amount: '1',
                unit: 'cup',
                category: 'Grains',
                note: 'cooked'
            },
            {
                name: 'Shelled Edamame',
                amount: '0.75',
                unit: 'cup',
                category: 'Produce',
                note: 'steamed'
            },
            {
                name: 'Low Sodium Soy Sauce',
                amount: '3',
                unit: 'tbsp',
                category: 'Condiments'
            },
            {
                name: 'Honey or Maple Syrup',
                amount: '1.5',
                unit: 'tbsp',
                category: 'Pantry'
            },
            {
                name: 'Fresh Ginger',
                amount: '1',
                unit: 'tsp',
                category: 'Produce',
                note: 'grated'
            },
            {
                name: 'Garlic',
                amount: '2',
                unit: 'cloves',
                category: 'Produce',
                note: 'minced'
            },
            {
                name: 'Toasted Sesame Seeds & Scallions',
                amount: '1',
                unit: 'tbsp',
                category: 'Pantry'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Mix Teriyaki Glaze',
                instruction: 'In a small bowl, whisk soy sauce, honey, grated ginger, minced garlic, and 2 tbsp water.',
                timerMinutes: 2
            },
            {
                step: 2,
                title: 'Brown the Chicken',
                instruction: 'Heat 1 tsp oil in a large skillet over medium-high heat. Add chicken pieces in a single layer and sear for 5 minutes until browned on all sides.',
                timerMinutes: 5
            },
            {
                step: 3,
                title: 'Simmer & Glaze',
                instruction: 'Pour the teriyaki sauce over the sizzling chicken. Simmer vigorously for 4-5 minutes until the sauce reduces to a glossy, thick lacquer coating every morsel.',
                timerMinutes: 4
            },
            {
                step: 4,
                title: 'Assemble Bowls',
                instruction: 'Scoop warm rice into bowls. Top with glazed teriyaki chicken, steamed edamame, fresh sliced scallions, and toasted sesame seeds.',
                timerMinutes: 2
            }
        ],
        tips: [
            'Double the recipe—this reheats extraordinarily well for weekday meal-prep lunches.'
        ],
        substitutions: [
            {
                originalIngredient: 'Soy Sauce',
                substituteIngredient: 'Tamari or Coconut Aminos',
                ratio: '1:1',
                notes: 'Makes recipe 100% Gluten-Free.'
            },
            {
                originalIngredient: 'White Rice',
                substituteIngredient: 'Cauliflower Rice or Quinoa',
                ratio: '1:1',
                notes: 'Reduces carbs for a keto profile.'
            }
        ],
        sourceType: 'seed',
        isPublic: true
    },
    // 6. 20-Minute Thai Red Coconut Curry with Tofu & Veggies
    {
        id: 'rec_catalog_06',
        title: '20-Minute Thai Red Coconut Curry with Crispy Tofu',
        slug: '20-minute-thai-red-coconut-curry-crispy-tofu',
        description: 'Fragrant red curry paste simmered in creamy coconut milk with crisp bell peppers, snap peas, and golden pan-crisped tofu cubes.',
        cuisine: 'Thai',
        region: 'Bangkok',
        mealType: 'dinner',
        mealTypes: [
            'dinner',
            'lunch'
        ],
        difficulty: 'easy',
        prepTime: 8,
        cookTime: 12,
        totalTime: 20,
        prepTimeMinutes: 8,
        cookTimeMinutes: 12,
        totalTimeMinutes: 20,
        servings: 2,
        calories: 440,
        protein: 24,
        carbs: 22,
        fat: 28,
        fiber: 6,
        proteinGrams: 24,
        carbohydratesGrams: 22,
        fatGrams: 28,
        fiberGrams: 6,
        dietary: [
            'Vegan',
            'Vegetarian',
            'Gluten-Free',
            'Dairy-Free'
        ],
        dietaryTags: [
            'Vegan',
            'Vegetarian',
            'Gluten-Free',
            'Dairy-Free'
        ],
        allergens: [
            'Soy'
        ],
        appliances: [
            'Stovetop'
        ],
        applianceTags: [
            'Stovetop'
        ],
        cookingMethods: [
            'Sauté',
            'Simmer'
        ],
        tags: [
            'thai',
            'curry',
            'vegan',
            'tofu',
            'coconut-curry',
            'under-30-min'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1000&q=80',
        ingredients: [
            {
                name: 'Firm Tofu',
                amount: '350',
                unit: 'g',
                category: 'Protein',
                note: 'pressed dry and cubed'
            },
            {
                name: 'Thai Red Curry Paste',
                amount: '2',
                unit: 'tbsp',
                category: 'Pantry'
            },
            {
                name: 'Light or Full-Fat Coconut Milk',
                amount: '1',
                unit: 'can (400ml)',
                category: 'Pantry'
            },
            {
                name: 'Red Bell Pepper',
                amount: '1',
                unit: 'medium',
                category: 'Produce',
                note: 'sliced thin'
            },
            {
                name: 'Snap Peas or Broccoli Florets',
                amount: '1',
                unit: 'cup',
                category: 'Produce'
            },
            {
                name: 'Coconut Oil or Sesame Oil',
                amount: '1',
                unit: 'tbsp',
                category: 'Pantry'
            },
            {
                name: 'Lime',
                amount: '1',
                unit: 'whole',
                category: 'Produce',
                note: 'juiced'
            },
            {
                name: 'Fresh Thai Basil or Cilantro',
                amount: '0.25',
                unit: 'cup',
                category: 'Produce'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Crisp the Tofu',
                instruction: 'Heat 1 tbsp oil in a skillet or wok over medium-high heat. Add cubed tofu and fry undisturbed for 5 minutes until golden on bottom, then turn and fry 3 more minutes. Transfer to plate.',
                timerMinutes: 8
            },
            {
                step: 2,
                title: 'Bloom the Curry Paste',
                instruction: 'In the same pan, spoon 2 tbsp curry paste into the hot oil. Fry for 1 minute until intoxicatingly fragrant.',
                timerMinutes: 1
            },
            {
                step: 3,
                title: 'Simmer Veggies in Coconut Milk',
                instruction: 'Pour in coconut milk, stirring to dissolve paste into a vibrant orange broth. Add sliced bell pepper and snap peas. Simmer for 4 minutes until tender-crisp.',
                timerMinutes: 4
            },
            {
                step: 4,
                title: 'Finish with Tofu & Lime',
                instruction: 'Return crispy tofu to curry. Remove from heat, stir in fresh lime juice, and scatter torn fresh basil leaves.',
                timerMinutes: 1
            }
        ],
        tips: [
            'Bloom curry paste in hot oil first to release fat-soluble aromatics before adding coconut milk.'
        ],
        substitutions: [
            {
                originalIngredient: 'Firm Tofu',
                substituteIngredient: 'Chicken Breast or Large Shrimp',
                ratio: '1:1',
                notes: 'Omnivore high-protein variation.'
            }
        ],
        sourceType: 'seed',
        isPublic: true
    },
    // 7. Instant Pot Butter Chicken (Murgh Makhani)
    {
        id: 'rec_catalog_07',
        title: 'Instant Pot Velvety Butter Chicken',
        slug: 'instant-pot-velvety-butter-chicken',
        description: 'Tender marinated chicken cooked in a rich, spiced tomato butter cream sauce infused with fenugreek and garam masala in the pressure cooker.',
        cuisine: 'Indian',
        region: 'Punjab',
        mealType: 'dinner',
        mealTypes: [
            'dinner'
        ],
        difficulty: 'intermediate',
        prepTime: 15,
        cookTime: 12,
        totalTime: 27,
        prepTimeMinutes: 15,
        cookTimeMinutes: 12,
        totalTimeMinutes: 27,
        servings: 4,
        calories: 540,
        protein: 48,
        carbs: 14,
        fat: 32,
        fiber: 3,
        proteinGrams: 48,
        carbohydratesGrams: 14,
        fatGrams: 32,
        fiberGrams: 3,
        dietary: [
            'High-Protein',
            'Gluten-Free',
            'Keto'
        ],
        dietaryTags: [
            'High-Protein',
            'Gluten-Free',
            'Keto'
        ],
        allergens: [
            'Milk'
        ],
        appliances: [
            'Instant Pot'
        ],
        applianceTags: [
            'Instant Pot'
        ],
        cookingMethods: [
            'Pressure cook'
        ],
        tags: [
            'butter-chicken',
            'indian',
            'instant-pot',
            'pressure-cooker',
            'high-protein',
            'curry'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=80',
        ingredients: [
            {
                name: 'Chicken Breast or Boneless Thighs',
                amount: '700',
                unit: 'g',
                category: 'Protein',
                note: 'cut into bite-sized chunks'
            },
            {
                name: 'Canned Crushed Tomatoes',
                amount: '1',
                unit: 'can (400g)',
                category: 'Pantry'
            },
            {
                name: 'Butter',
                amount: '3',
                unit: 'tbsp',
                category: 'Dairy & Eggs'
            },
            {
                name: 'Heavy Cream',
                amount: '0.5',
                unit: 'cup',
                category: 'Dairy & Eggs'
            },
            {
                name: 'Garlic & Ginger Paste',
                amount: '1.5',
                unit: 'tbsp',
                category: 'Produce'
            },
            {
                name: 'Garam Masala',
                amount: '1.5',
                unit: 'tsp',
                category: 'Pantry'
            },
            {
                name: 'Ground Cumin & Smoked Paprika',
                amount: '1',
                unit: 'tsp',
                category: 'Pantry'
            },
            {
                name: 'Kasuri Methi (Fenugreek leaves)',
                amount: '1',
                unit: 'tsp',
                category: 'Pantry'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Layer Ingredients in Instant Pot',
                instruction: 'Place crushed tomatoes, garlic-ginger paste, garam masala, cumin, smoked paprika, and salt in Instant Pot. Stir well. Place chicken pieces on top without stirring.',
                timerMinutes: 4
            },
            {
                step: 2,
                title: 'Pressure Cook',
                instruction: 'Secure the lid. Set to Pressure Cook High for 6 minutes, followed by 5 minutes natural pressure release, then quick release remaining pressure.',
                timerMinutes: 11
            },
            {
                step: 3,
                title: 'Enrich Sauce',
                instruction: 'Select Sauté mode. Stir in cold butter and heavy cream. Simmer for 3 minutes until sauce thickens to luxurious velvet consistency.',
                timerMinutes: 3
            },
            {
                step: 4,
                title: 'Crush Fenugreek',
                instruction: 'Rub kasuri methi between palms and sprinkle into sauce. Serve over steamed basmati rice with warm naan.',
                timerMinutes: 1
            }
        ],
        tips: [
            'Placing tomatoes under the chicken prevents any chance of "burn" warning.'
        ],
        substitutions: [
            {
                originalIngredient: 'Chicken',
                substituteIngredient: 'Paneer or Chickpeas',
                ratio: '1:1',
                notes: 'Transforms into vegetarian Butter Paneer.'
            },
            {
                originalIngredient: 'Heavy Cream',
                substituteIngredient: 'Cashew cream',
                ratio: '1:1',
                notes: 'Smooth dairy-free authentic option.'
            }
        ],
        sourceType: 'seed',
        isPublic: true
    },
    // 8. Mediterranean Quinoa Power Salad with Feta & Lemon Vinaigrette
    {
        id: 'rec_catalog_08',
        title: 'Mediterranean Quinoa Power Salad with Creamy Feta',
        slug: 'mediterranean-quinoa-power-salad-creamy-feta',
        description: 'Nutty fluffy quinoa tossed with crisp Persian cucumbers, sweet cherry tomatoes, kalamata olives, and rich crumbled Greek feta in an oregano vinaigrette.',
        cuisine: 'Mediterranean',
        region: 'Aegean',
        mealType: 'lunch',
        mealTypes: [
            'lunch',
            'dinner'
        ],
        difficulty: 'beginner',
        prepTime: 12,
        cookTime: 0,
        totalTime: 12,
        prepTimeMinutes: 12,
        cookTimeMinutes: 0,
        totalTimeMinutes: 12,
        servings: 2,
        calories: 420,
        protein: 18,
        carbs: 46,
        fat: 20,
        fiber: 8,
        proteinGrams: 18,
        carbohydratesGrams: 46,
        fatGrams: 20,
        fiberGrams: 8,
        dietary: [
            'Vegetarian',
            'Gluten-Free',
            'High-Fiber'
        ],
        dietaryTags: [
            'Vegetarian',
            'Gluten-Free',
            'High-Fiber'
        ],
        allergens: [
            'Milk'
        ],
        appliances: [
            'Stovetop'
        ],
        applianceTags: [
            'Stovetop'
        ],
        cookingMethods: [
            'Raw / Toss'
        ],
        tags: [
            'salad',
            'quinoa',
            'mediterranean',
            'feta',
            'vegetarian',
            'no-cook'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
        ingredients: [
            {
                name: 'Cooked Quinoa',
                amount: '2',
                unit: 'cups',
                category: 'Grains',
                note: 'chilled or room temp'
            },
            {
                name: 'Persian Cucumbers',
                amount: '2',
                unit: 'medium',
                category: 'Produce',
                note: 'diced'
            },
            {
                name: 'Cherry Tomatoes',
                amount: '1',
                unit: 'cup',
                category: 'Produce',
                note: 'halved'
            },
            {
                name: 'Kalamata Olives',
                amount: '0.33',
                unit: 'cup',
                category: 'Pantry',
                note: 'pitted and halved'
            },
            {
                name: 'Crumbled Feta Cheese',
                amount: '0.5',
                unit: 'cup',
                category: 'Dairy & Eggs'
            },
            {
                name: 'Red Onion',
                amount: '0.25',
                unit: 'cup',
                category: 'Produce',
                note: 'finely sliced'
            },
            {
                name: 'Extra Virgin Olive Oil',
                amount: '2',
                unit: 'tbsp',
                category: 'Pantry'
            },
            {
                name: 'Red Wine Vinegar & Dried Oregano',
                amount: '1.5',
                unit: 'tbsp',
                category: 'Pantry'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Whisk Vinaigrette',
                instruction: 'In a salad bowl, whisk olive oil, red wine vinegar, dried oregano, salt, and freshly cracked black pepper.',
                timerMinutes: 2
            },
            {
                step: 2,
                title: 'Toss Veggies & Grains',
                instruction: 'Add cooked quinoa, diced cucumbers, halved tomatoes, sliced red onion, and kalamata olives to the bowl.',
                timerMinutes: 3
            },
            {
                step: 3,
                title: 'Fold Feta',
                instruction: 'Gently fold through crumbled feta cheese so it absorbs the dressing without completely breaking down.',
                timerMinutes: 1
            }
        ],
        tips: [
            'Rinse quinoa in cold water after cooking to stop steaming and keep it light and fluffy.'
        ],
        substitutions: [
            {
                originalIngredient: 'Feta Cheese',
                substituteIngredient: 'Avocado cubes',
                ratio: '1:1',
                notes: 'Makes this salad 100% plant-based vegan.'
            }
        ],
        sourceType: 'seed',
        isPublic: true
    },
    // 9. Quick Korean Beef (Bulgogi Ground Beef Bowl)
    {
        id: 'rec_catalog_09',
        title: '15-Minute Korean Bulgogi Beef & Rice Bowl',
        slug: '15-minute-korean-bulgogi-beef-rice-bowl',
        description: 'Caramelized ground beef glazed with toasted sesame, ginger, garlic, and brown sugar served with steamed rice, sliced green onions, and sriracha.',
        cuisine: 'Korean',
        region: 'Seoul',
        mealType: 'dinner',
        mealTypes: [
            'dinner',
            'lunch'
        ],
        difficulty: 'beginner',
        prepTime: 5,
        cookTime: 10,
        totalTime: 15,
        prepTimeMinutes: 5,
        cookTimeMinutes: 10,
        totalTimeMinutes: 15,
        servings: 2,
        calories: 530,
        protein: 42,
        carbs: 48,
        fat: 18,
        fiber: 3,
        proteinGrams: 42,
        carbohydratesGrams: 48,
        fatGrams: 18,
        fiberGrams: 3,
        dietary: [
            'High-Protein',
            'Dairy-Free'
        ],
        dietaryTags: [
            'High-Protein',
            'Dairy-Free'
        ],
        allergens: [
            'Soy'
        ],
        appliances: [
            'Stovetop'
        ],
        applianceTags: [
            'Stovetop'
        ],
        cookingMethods: [
            'Sauté'
        ],
        tags: [
            'korean',
            'bulgogi',
            'beef',
            'under-15-min',
            'rice-bowl',
            'high-protein'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80',
        ingredients: [
            {
                name: 'Lean Ground Beef (90/10)',
                amount: '350',
                unit: 'g',
                category: 'Protein'
            },
            {
                name: 'Soy Sauce',
                amount: '3',
                unit: 'tbsp',
                category: 'Condiments'
            },
            {
                name: 'Brown Sugar or Honey',
                amount: '1.5',
                unit: 'tbsp',
                category: 'Pantry'
            },
            {
                name: 'Toasted Sesame Oil',
                amount: '1',
                unit: 'tbsp',
                category: 'Pantry'
            },
            {
                name: 'Fresh Garlic',
                amount: '3',
                unit: 'cloves',
                category: 'Produce',
                note: 'minced'
            },
            {
                name: 'Fresh Ginger',
                amount: '1',
                unit: 'tsp',
                category: 'Produce',
                note: 'grated'
            },
            {
                name: 'Cooked Jasmine Rice',
                amount: '1.5',
                unit: 'cups',
                category: 'Grains'
            },
            {
                name: 'Scallions & Sesame Seeds',
                amount: '2',
                unit: 'tbsp',
                category: 'Produce'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Mix Bulgogi Sauce',
                instruction: 'Stir together soy sauce, brown sugar, sesame oil, minced garlic, and ginger until sugar dissolves.',
                timerMinutes: 2
            },
            {
                step: 2,
                title: 'Brown the Beef',
                instruction: 'Heat a dry skillet over medium-high heat. Add ground beef and break up with a wooden spoon until browned and crispy at edges.',
                timerMinutes: 5
            },
            {
                step: 3,
                title: 'Glaze with Sauce',
                instruction: 'Pour bulgogi sauce directly over the beef. Simmer for 2 minutes until glossy and deeply caramelized.',
                timerMinutes: 2
            },
            {
                step: 4,
                title: 'Assemble & Serve',
                instruction: 'Spoon hot beef over steaming rice. Top generously with sliced green onions and toasted sesame seeds.',
                timerMinutes: 1
            }
        ],
        tips: [
            'Let the ground beef sear without stirring for 2 minutes initially to achieve crispy restaurant-grade browning.'
        ],
        substitutions: [
            {
                originalIngredient: 'Ground Beef',
                substituteIngredient: 'Ground Turkey or Crumbled Tempeh',
                ratio: '1:1',
                notes: 'Leaner or plant-based version.'
            }
        ],
        sourceType: 'seed',
        isPublic: true
    },
    // 10. Classic French Ratatouille with Herbed Goat Cheese
    {
        id: 'rec_catalog_10',
        title: 'Provençal Ratatouille with Herbed Goat Cheese',
        slug: 'provencal-ratatouille-with-herbed-goat-cheese',
        description: 'Thinly sliced eggplant, zucchini, yellow squash, and roma tomatoes baked gently over a savory garlic-bell pepper tomato purée with thyme and creamy chèvre.',
        cuisine: 'French',
        region: 'Provence',
        mealType: 'dinner',
        mealTypes: [
            'dinner',
            'lunch'
        ],
        difficulty: 'intermediate',
        prepTime: 20,
        cookTime: 35,
        totalTime: 55,
        prepTimeMinutes: 20,
        cookTimeMinutes: 35,
        totalTimeMinutes: 55,
        servings: 4,
        calories: 240,
        protein: 10,
        carbs: 22,
        fat: 14,
        fiber: 8,
        proteinGrams: 10,
        carbohydratesGrams: 22,
        fatGrams: 14,
        fiberGrams: 8,
        dietary: [
            'Vegetarian',
            'Gluten-Free',
            'Low-Carb'
        ],
        dietaryTags: [
            'Vegetarian',
            'Gluten-Free',
            'Low-Carb'
        ],
        allergens: [
            'Milk'
        ],
        appliances: [
            'Oven'
        ],
        applianceTags: [
            'Oven'
        ],
        cookingMethods: [
            'Bake'
        ],
        tags: [
            'french',
            'ratatouille',
            'vegetables',
            'low-calorie',
            'vegetarian',
            'provence'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
        ingredients: [
            {
                name: 'Eggplant',
                amount: '1',
                unit: 'medium',
                category: 'Produce',
                note: 'sliced into 1/8 inch rounds'
            },
            {
                name: 'Zucchini & Yellow Squash',
                amount: '2',
                unit: 'medium',
                category: 'Produce',
                note: 'sliced into rounds'
            },
            {
                name: 'Roma Tomatoes',
                amount: '4',
                unit: 'medium',
                category: 'Produce',
                note: 'sliced into rounds'
            },
            {
                name: 'Tomato Passata or Marinara',
                amount: '1.5',
                unit: 'cups',
                category: 'Pantry'
            },
            {
                name: 'Garlic',
                amount: '3',
                unit: 'cloves',
                category: 'Produce',
                note: 'minced'
            },
            {
                name: 'Fresh Thyme & Rosemary',
                amount: '1',
                unit: 'tbsp',
                category: 'Produce'
            },
            {
                name: 'Extra Virgin Olive Oil',
                amount: '2',
                unit: 'tbsp',
                category: 'Pantry'
            },
            {
                name: 'Goat Cheese (Chèvre)',
                amount: '80',
                unit: 'g',
                category: 'Dairy & Eggs'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Base Sauce',
                instruction: 'Spread tomato passata, minced garlic, and 1 tbsp olive oil evenly across bottom of a baking dish. Season with salt and pepper.',
                timerMinutes: 3
            },
            {
                step: 2,
                title: 'Arrange Vegetables',
                instruction: 'Alternate slices of eggplant, zucchini, yellow squash, and tomato in tight concentric circles over the sauce.',
                timerMinutes: 10
            },
            {
                step: 3,
                title: 'Bake Covered',
                instruction: 'Drizzle remaining olive oil and scatter fresh thyme over vegetables. Cover with parchment paper and bake at 375°F (190°C) for 30 minutes.',
                timerMinutes: 30
            },
            {
                step: 4,
                title: 'Uncover & Crumble Chèvre',
                instruction: 'Remove parchment, dot with crumbled goat cheese, and bake 10 more minutes until vegetables are meltingly tender and cheese is lightly golden.',
                timerMinutes: 10
            }
        ],
        tips: [
            'Use a mandoline for paper-thin, uniform vegetable slices that cook at the exact same pace.'
        ],
        substitutions: [
            {
                originalIngredient: 'Goat Cheese',
                substituteIngredient: 'Omit or Vegan Feta',
                ratio: '1:1',
                notes: 'Makes 100% plant-based vegan ratatouille.'
            }
        ],
        sourceType: 'seed',
        isPublic: true
    },
    // 11. Sizzling Spanish Garlic Shrimp (Gambas al Ajillo)
    {
        id: 'rec_catalog_11',
        title: 'Sizzling Spanish Garlic Shrimp (Gambas al Ajillo)',
        slug: 'sizzling-spanish-garlic-shrimp-gambas-al-ajillo',
        description: 'Tender jumbo prawns gently poached in fragrant garlic-infused extra virgin olive oil, smoked pimentón de la Vera, dry sherry, and fresh parsley.',
        cuisine: 'Spanish',
        region: 'Andalusia',
        mealType: 'appetizer',
        mealTypes: [
            'appetizer',
            'dinner'
        ],
        difficulty: 'easy',
        prepTime: 8,
        cookTime: 6,
        totalTime: 14,
        prepTimeMinutes: 8,
        cookTimeMinutes: 6,
        totalTimeMinutes: 14,
        servings: 2,
        calories: 360,
        protein: 34,
        carbs: 4,
        fat: 24,
        fiber: 1,
        proteinGrams: 34,
        carbohydratesGrams: 4,
        fatGrams: 24,
        fiberGrams: 1,
        dietary: [
            'High-Protein',
            'Keto',
            'Gluten-Free',
            'Dairy-Free',
            'Pescatarian'
        ],
        dietaryTags: [
            'High-Protein',
            'Keto',
            'Gluten-Free',
            'Dairy-Free',
            'Pescatarian'
        ],
        allergens: [
            'Shellfish'
        ],
        appliances: [
            'Stovetop'
        ],
        applianceTags: [
            'Stovetop'
        ],
        cookingMethods: [
            'Sauté'
        ],
        tags: [
            'spanish',
            'tapas',
            'shrimp',
            'garlic',
            'keto',
            'under-15-min'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1000&q=80',
        ingredients: [
            {
                name: 'Raw Jumbo Shrimp',
                amount: '350',
                unit: 'g',
                category: 'Protein',
                note: 'peeled, deveined, patted dry'
            },
            {
                name: 'Extra Virgin Olive Oil',
                amount: '0.33',
                unit: 'cup',
                category: 'Pantry'
            },
            {
                name: 'Garlic',
                amount: '6',
                unit: 'cloves',
                category: 'Produce',
                note: 'thinly sliced'
            },
            {
                name: 'Smoked Spanish Paprika',
                amount: '1',
                unit: 'tsp',
                category: 'Pantry'
            },
            {
                name: 'Red Pepper Flakes',
                amount: '0.5',
                unit: 'tsp',
                category: 'Pantry'
            },
            {
                name: 'Dry White Wine or Sherry',
                amount: '2',
                unit: 'tbsp',
                category: 'Pantry'
            },
            {
                name: 'Fresh Flat-Leaf Parsley',
                amount: '3',
                unit: 'tbsp',
                category: 'Produce',
                note: 'minced'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Infuse Garlic Oil',
                instruction: 'Heat olive oil and sliced garlic in a wide shallow skillet over low heat for 3 minutes until garlic is blonde and fragrant without burning.',
                timerMinutes: 3
            },
            {
                step: 2,
                title: 'Add Shrimp & Spices',
                instruction: 'Turn heat up to medium-high. Add shrimp, smoked paprika, and chili flakes. Sauté for 2 minutes tossing constantly until pink and curled.',
                timerMinutes: 2
            },
            {
                step: 3,
                title: 'Deglaze & Garnish',
                instruction: 'Splash with dry sherry, scrape bottom of pan, and stir in fresh parsley. Serve immediately in sizzling oil with crusty bread.',
                timerMinutes: 1
            }
        ],
        tips: [
            'Start garlic in cold oil so it infuses its aromatics slowly without turning bitter.'
        ],
        substitutions: [
            {
                originalIngredient: 'Shrimp',
                substituteIngredient: 'Sea Scallops or Sliced Mushrooms',
                ratio: '1:1',
                notes: 'Delicious mushroom al ajillo for vegetarians.'
            }
        ],
        sourceType: 'seed',
        isPublic: true
    },
    // 12. Greek Chicken Souvlaki Skewers with Tzatziki
    {
        id: 'rec_catalog_12',
        title: 'Grilled Greek Chicken Souvlaki with Homemade Tzatziki',
        slug: 'grilled-greek-chicken-souvlaki-homemade-tzatziki',
        description: 'Tender lemon-oregano marinated chicken breast skewers grilled over hot grates, paired with cool cucumber garlic tzatziki and warm pita.',
        cuisine: 'Greek',
        region: 'Athens',
        mealType: 'dinner',
        mealTypes: [
            'dinner',
            'lunch'
        ],
        difficulty: 'easy',
        prepTime: 15,
        cookTime: 10,
        totalTime: 25,
        prepTimeMinutes: 15,
        cookTimeMinutes: 10,
        totalTimeMinutes: 25,
        servings: 2,
        calories: 470,
        protein: 48,
        carbs: 24,
        fat: 18,
        fiber: 3,
        proteinGrams: 48,
        carbohydratesGrams: 24,
        fatGrams: 18,
        fiberGrams: 3,
        dietary: [
            'High-Protein'
        ],
        dietaryTags: [
            'High-Protein'
        ],
        allergens: [
            'Milk',
            'Wheat'
        ],
        appliances: [
            'Grill',
            'Stovetop',
            'Air Fryer'
        ],
        applianceTags: [
            'Grill',
            'Stovetop',
            'Air Fryer'
        ],
        cookingMethods: [
            'Grill',
            'Air fry'
        ],
        tags: [
            'greek',
            'souvlaki',
            'chicken-skewers',
            'tzatziki',
            'high-protein'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1000&q=80',
        ingredients: [
            {
                name: 'Chicken Breast',
                amount: '450',
                unit: 'g',
                category: 'Protein',
                note: 'cut into 1-inch cubes'
            },
            {
                name: 'Greek Yogurt',
                amount: '0.75',
                unit: 'cup',
                category: 'Dairy & Eggs'
            },
            {
                name: 'Cucumber',
                amount: '0.5',
                unit: 'medium',
                category: 'Produce',
                note: 'grated and squeezed dry'
            },
            {
                name: 'Lemon',
                amount: '1',
                unit: 'whole',
                category: 'Produce',
                note: 'juiced'
            },
            {
                name: 'Garlic',
                amount: '3',
                unit: 'cloves',
                category: 'Produce',
                note: 'grated'
            },
            {
                name: 'Dried Oregano',
                amount: '1.5',
                unit: 'tsp',
                category: 'Pantry'
            },
            {
                name: 'Olive Oil',
                amount: '2',
                unit: 'tbsp',
                category: 'Pantry'
            },
            {
                name: 'Pita Breads',
                amount: '2',
                unit: 'rounds',
                category: 'Grains'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Marinate Chicken',
                instruction: 'Toss chicken cubes with 1 tbsp olive oil, half the lemon juice, 2 grated garlic cloves, oregano, salt, and pepper.',
                timerMinutes: 5
            },
            {
                step: 2,
                title: 'Mix Tzatziki',
                instruction: 'In a bowl, mix Greek yogurt, grated squeezed cucumber, 1 grated garlic clove, 1 tbsp olive oil, remaining lemon juice, and a pinch of salt.',
                timerMinutes: 5
            },
            {
                step: 3,
                title: 'Thread & Grill',
                instruction: 'Thread chicken onto skewers. Grill on high (or air fry at 400°F) for 10 minutes, turning once, until nicely charred and juicy.',
                timerMinutes: 10
            },
            {
                step: 4,
                title: 'Serve',
                instruction: 'Warm pita breads, slide chicken off skewers, and dollop generously with cold tzatziki.',
                timerMinutes: 2
            }
        ],
        tips: [
            'Always squeeze cucumber thoroughly in a kitchen towel to avoid watery tzatziki.'
        ],
        substitutions: [
            {
                originalIngredient: 'Pita Breads',
                substituteIngredient: 'Romaine lettuce wraps',
                ratio: '1:1',
                notes: 'Ketogenic low-carb option.'
            }
        ],
        sourceType: 'seed',
        isPublic: true
    },
    // 13. Wok-Seared Chinese Beef & Broccoli with Ginger Garlic Sauce
    {
        id: 'rec_catalog_13',
        title: 'Wok-Seared Chinese Beef & Broccoli Stir-Fry',
        slug: 'wok-seared-chinese-beef-broccoli-stir-fry',
        description: 'Velvety thinly-sliced flank steak and crisp broccoli florets tossed in a savory brown garlic-oyster sauce over high heat in minutes.',
        cuisine: 'Chinese',
        region: 'Guangdong',
        mealType: 'dinner',
        mealTypes: [
            'dinner',
            'lunch'
        ],
        difficulty: 'easy',
        prepTime: 12,
        cookTime: 8,
        totalTime: 20,
        prepTimeMinutes: 12,
        cookTimeMinutes: 8,
        totalTimeMinutes: 20,
        servings: 2,
        calories: 450,
        protein: 42,
        carbs: 18,
        fat: 22,
        fiber: 5,
        proteinGrams: 42,
        carbohydratesGrams: 18,
        fatGrams: 22,
        fiberGrams: 5,
        dietary: [
            'High-Protein',
            'Dairy-Free'
        ],
        dietaryTags: [
            'High-Protein',
            'Dairy-Free'
        ],
        allergens: [
            'Soy'
        ],
        appliances: [
            'Stovetop'
        ],
        applianceTags: [
            'Stovetop'
        ],
        cookingMethods: [
            'Sauté'
        ],
        tags: [
            'chinese',
            'beef-and-broccoli',
            'stir-fry',
            'high-protein',
            'quick-dinner'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1000&q=80',
        ingredients: [
            {
                name: 'Flank Steak or Sirloin',
                amount: '350',
                unit: 'g',
                category: 'Protein',
                note: 'sliced thinly against the grain'
            },
            {
                name: 'Fresh Broccoli Florets',
                amount: '3',
                unit: 'cups',
                category: 'Produce'
            },
            {
                name: 'Soy Sauce',
                amount: '3',
                unit: 'tbsp',
                category: 'Condiments'
            },
            {
                name: 'Oyster Sauce or Hoisin',
                amount: '1.5',
                unit: 'tbsp',
                category: 'Condiments'
            },
            {
                name: 'Cornstarch',
                amount: '1',
                unit: 'tbsp',
                category: 'Pantry'
            },
            {
                name: 'Garlic & Fresh Ginger',
                amount: '1.5',
                unit: 'tbsp',
                category: 'Produce',
                note: 'finely minced'
            },
            {
                name: 'Sesame Oil',
                amount: '1',
                unit: 'tsp',
                category: 'Pantry'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Velvet the Beef',
                instruction: 'Toss sliced beef with 1 tbsp soy sauce and 1 tbsp cornstarch. Set aside while preparing wok.',
                timerMinutes: 5
            },
            {
                step: 2,
                title: 'Steam Broccoli',
                instruction: 'Blanch or steam broccoli florets with 2 tbsp water in covered skillet for 2 minutes until bright emerald. Set aside.',
                timerMinutes: 2
            },
            {
                step: 3,
                title: 'Sear Beef',
                instruction: 'Heat 1 tbsp oil in wok over highest heat. Spread beef in single layer and sear for 2 minutes undisturbed until browned.',
                timerMinutes: 2
            },
            {
                step: 4,
                title: 'Toss with Sauce',
                instruction: 'Add garlic, ginger, remaining soy sauce, oyster sauce, and cooked broccoli. Toss vigorously for 1 minute until sauce glazes the beef.',
                timerMinutes: 1
            }
        ],
        tips: [
            'Cutting meat against the grain snaps tough muscle fibers, creating melt-in-mouth texture.'
        ],
        substitutions: [
            {
                originalIngredient: 'Beef',
                substituteIngredient: 'Chicken Breast or Sliced Portobello',
                ratio: '1:1',
                notes: 'Great variation.'
            }
        ],
        sourceType: 'seed',
        isPublic: true
    },
    // 14. Middle Eastern Crispy Falafel & Tahini Hummus Bowl
    {
        id: 'rec_catalog_14',
        title: 'Middle Eastern Air-Fried Herb Falafel Bowl with Tahini',
        slug: 'middle-eastern-air-fried-herb-falafel-bowl-tahini',
        description: 'Vibrant green herb-packed chickpea falafels air-fried to golden perfection, served over velvety garlic hummus, sumac onions, and lemon tahini drizzle.',
        cuisine: 'Middle Eastern',
        region: 'Levant',
        mealType: 'lunch',
        mealTypes: [
            'lunch',
            'dinner'
        ],
        difficulty: 'intermediate',
        prepTime: 15,
        cookTime: 14,
        totalTime: 29,
        prepTimeMinutes: 15,
        cookTimeMinutes: 14,
        totalTimeMinutes: 29,
        servings: 2,
        calories: 480,
        protein: 20,
        carbs: 54,
        fat: 22,
        fiber: 14,
        proteinGrams: 20,
        carbohydratesGrams: 54,
        fatGrams: 22,
        fiberGrams: 14,
        dietary: [
            'Vegan',
            'Vegetarian',
            'Dairy-Free',
            'High-Fiber'
        ],
        dietaryTags: [
            'Vegan',
            'Vegetarian',
            'Dairy-Free',
            'High-Fiber'
        ],
        allergens: [
            'Sesame'
        ],
        appliances: [
            'Air Fryer',
            'Food Processor'
        ],
        applianceTags: [
            'Air Fryer',
            'Food Processor'
        ],
        cookingMethods: [
            'Air fry'
        ],
        tags: [
            'falafel',
            'middle-eastern',
            'vegan',
            'air-fryer',
            'hummus',
            'tahini'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
        ingredients: [
            {
                name: 'Canned or Soaked Chickpeas',
                amount: '1.5',
                unit: 'cups',
                category: 'Pantry',
                note: 'rinsed and thoroughly dried'
            },
            {
                name: 'Fresh Parsley & Cilantro',
                amount: '1',
                unit: 'packed cup',
                category: 'Produce'
            },
            {
                name: 'Onion & Garlic',
                amount: '1',
                unit: 'small onion + 3 cloves',
                category: 'Produce'
            },
            {
                name: 'Ground Cumin & Coriander',
                amount: '1.5',
                unit: 'tsp',
                category: 'Pantry'
            },
            {
                name: 'Flour or Chickpea Flour',
                amount: '2',
                unit: 'tbsp',
                category: 'Pantry'
            },
            {
                name: 'Tahini',
                amount: '3',
                unit: 'tbsp',
                category: 'Pantry'
            },
            {
                name: 'Hummus',
                amount: '0.5',
                unit: 'cup',
                category: 'Condiments'
            },
            {
                name: 'Lemon Juice',
                amount: '2',
                unit: 'tbsp',
                category: 'Produce'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Pulse Falafel Dough',
                instruction: 'Pulse chickpeas, fresh herbs, onion, garlic, cumin, coriander, flour, salt, and pepper in a food processor until finely minced but not puréed.',
                timerMinutes: 3
            },
            {
                step: 2,
                title: 'Form Patties',
                instruction: 'Form mixture into 8 small rounded patties. Lightly spray or brush with olive oil.',
                timerMinutes: 5
            },
            {
                step: 3,
                title: 'Air Fry to Crisp',
                instruction: 'Preheat air fryer to 380°F (190°C). Air fry falafel for 12-14 minutes, flipping gently halfway, until deep golden brown and crispy.',
                timerMinutes: 13
            },
            {
                step: 4,
                title: 'Plate with Tahini',
                instruction: 'Whisk tahini with lemon juice and water until creamy. Spread hummus into bowls, top with hot falafels, and drizzle with tahini.',
                timerMinutes: 2
            }
        ],
        tips: [
            'Make sure chickpeas are completely dry before processing so patties hold their shape nicely.'
        ],
        substitutions: [
            {
                originalIngredient: 'Tahini',
                substituteIngredient: 'Greek yogurt with garlic',
                ratio: '1:1',
                notes: 'Tangy vegetarian substitute.'
            }
        ],
        sourceType: 'seed',
        isPublic: true
    },
    // 15. Air Fryer Crispy Buffalo Cauliflower Bites
    {
        id: 'rec_catalog_15',
        title: 'Air Fryer Crispy Buffalo Cauliflower Bites',
        slug: 'air-fryer-crispy-buffalo-cauliflower-bites',
        description: 'Addictively crispy cauliflower florets coated in almond-spiced batter, air-fried, and glazed in tangy buffalo hot sauce with creamy ranch.',
        cuisine: 'American',
        region: 'New York',
        mealType: 'snack',
        mealTypes: [
            'snack',
            'appetizer'
        ],
        difficulty: 'easy',
        prepTime: 10,
        cookTime: 15,
        totalTime: 25,
        prepTimeMinutes: 10,
        cookTimeMinutes: 15,
        totalTimeMinutes: 25,
        servings: 2,
        calories: 220,
        protein: 8,
        carbs: 24,
        fat: 10,
        fiber: 6,
        proteinGrams: 8,
        carbohydratesGrams: 24,
        fatGrams: 10,
        fiberGrams: 6,
        dietary: [
            'Vegetarian',
            'Vegan',
            'Gluten-Free',
            'Low-Calorie'
        ],
        dietaryTags: [
            'Vegetarian',
            'Vegan',
            'Gluten-Free',
            'Low-Calorie'
        ],
        allergens: [],
        appliances: [
            'Air Fryer'
        ],
        applianceTags: [
            'Air Fryer'
        ],
        cookingMethods: [
            'Air fry'
        ],
        tags: [
            'buffalo-cauliflower',
            'air-fryer',
            'appetizer',
            'snack',
            'vegan',
            'game-day'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
        ingredients: [
            {
                name: 'Fresh Cauliflower',
                amount: '1',
                unit: 'medium head (approx 500g)',
                category: 'Produce',
                note: 'cut into bite-sized florets'
            },
            {
                name: 'Flour or Chickpea Flour',
                amount: '0.5',
                unit: 'cup',
                category: 'Pantry'
            },
            {
                name: 'Garlic Powder & Smoked Paprika',
                amount: '1',
                unit: 'tsp each',
                category: 'Pantry'
            },
            {
                name: 'Buffalo Hot Sauce (Frank\'s RedHot)',
                amount: '0.33',
                unit: 'cup',
                category: 'Condiments'
            },
            {
                name: 'Melted Coconut Oil or Butter',
                amount: '1',
                unit: 'tbsp',
                category: 'Pantry'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Batter Florets',
                instruction: 'Whisk flour, garlic powder, paprika, salt, and 1/2 cup water into a pancake-like batter. Dip cauliflower florets, shaking off excess.',
                timerMinutes: 5
            },
            {
                step: 2,
                title: 'First Air Fry',
                instruction: 'Preheat air fryer to 390°F (200°C). Air fry battered florets in a single layer for 10 minutes until crispy and lightly browned.',
                timerMinutes: 10
            },
            {
                step: 3,
                title: 'Buffalo Toss & Re-Crisp',
                instruction: 'Toss hot florets in mixed hot sauce and melted butter. Return to air fryer for 4 more minutes to caramelize sauce.',
                timerMinutes: 4
            }
        ],
        tips: [
            'Don\'t overcrowd the air fryer basket; do two batches if necessary for max crunch.'
        ],
        substitutions: [
            {
                originalIngredient: 'Buffalo Sauce',
                substituteIngredient: 'BBQ sauce or Sweet Chili sauce',
                ratio: '1:1',
                notes: 'Mild family-friendly alternative.'
            }
        ],
        sourceType: 'seed',
        isPublic: true
    },
    // 16. Overnight Berry Chia Greek Yogurt Parfait
    {
        id: 'rec_catalog_16',
        title: 'Overnight Berry Chia Greek Yogurt Power Parfait',
        slug: 'overnight-berry-chia-greek-yogurt-power-parfait',
        description: 'Velvety protein-packed Greek yogurt layered with plump chia berry compote, toasted almond slivers, and raw wildflower honey.',
        cuisine: 'American',
        region: 'California',
        mealType: 'breakfast',
        mealTypes: [
            'breakfast',
            'snack',
            'dessert'
        ],
        difficulty: 'beginner',
        prepTime: 5,
        cookTime: 0,
        totalTime: 5,
        prepTimeMinutes: 5,
        cookTimeMinutes: 0,
        totalTimeMinutes: 5,
        servings: 2,
        calories: 340,
        protein: 26,
        carbs: 32,
        fat: 12,
        fiber: 8,
        proteinGrams: 26,
        carbohydratesGrams: 32,
        fatGrams: 12,
        fiberGrams: 8,
        dietary: [
            'High-Protein',
            'Vegetarian',
            'Gluten-Free'
        ],
        dietaryTags: [
            'High-Protein',
            'Vegetarian',
            'Gluten-Free'
        ],
        allergens: [
            'Milk',
            'Tree Nuts'
        ],
        appliances: [
            'Stovetop'
        ],
        applianceTags: [
            'Stovetop'
        ],
        cookingMethods: [
            'Raw / Toss'
        ],
        tags: [
            'parfait',
            'breakfast',
            'chia',
            'greek-yogurt',
            'berries',
            'high-protein'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=80',
        ingredients: [
            {
                name: 'Plain Greek Yogurt (0% or 2%)',
                amount: '1.5',
                unit: 'cups',
                category: 'Dairy & Eggs'
            },
            {
                name: 'Fresh or Frozen Mixed Berries',
                amount: '1',
                unit: 'cup',
                category: 'Produce'
            },
            {
                name: 'Chia Seeds',
                amount: '2',
                unit: 'tbsp',
                category: 'Pantry'
            },
            {
                name: 'Raw Honey or Pure Maple Syrup',
                amount: '1.5',
                unit: 'tbsp',
                category: 'Pantry'
            },
            {
                name: 'Toasted Sliced Almonds',
                amount: '2',
                unit: 'tbsp',
                category: 'Pantry'
            },
            {
                name: 'Pure Vanilla Extract',
                amount: '0.5',
                unit: 'tsp',
                category: 'Pantry'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Quick Berry Chia Compote',
                instruction: 'Lightly crush berries in a bowl with a fork, stir in chia seeds and 1 tsp honey. Let rest 5 minutes to thicken into compote.',
                timerMinutes: 5
            },
            {
                step: 2,
                title: 'Flavor Yogurt',
                instruction: 'Stir vanilla extract and remaining honey into the Greek yogurt until smooth.',
                timerMinutes: 1
            },
            {
                step: 3,
                title: 'Layer & Chill',
                instruction: 'In glasses or jars, alternate layers of vanilla Greek yogurt and berry chia compote. Top with crunchy almonds.',
                timerMinutes: 2
            }
        ],
        tips: [
            'Prep in mason jars the night before for grab-and-go morning nutrition.'
        ],
        substitutions: [
            {
                originalIngredient: 'Greek Yogurt',
                substituteIngredient: 'Coconut or Almond Milk Yogurt',
                ratio: '1:1',
                notes: 'Makes this 100% plant-based vegan.'
            }
        ],
        sourceType: 'seed',
        isPublic: true
    },
    // 17. Slow-Cooker Mexican Barbacoa Shredded Beef
    {
        id: 'rec_catalog_17',
        title: 'Slow-Cooker Mexican Chipotle Barbacoa Beef',
        slug: 'slow-cooker-mexican-chipotle-barbacoa-beef',
        description: 'Melt-in-your-mouth tender chuck roast slow-braised in a savory blend of chipotle peppers in adobo, cumin, cloves, lime juice, and garlic.',
        cuisine: 'Mexican',
        region: 'Jalisco',
        mealType: 'dinner',
        mealTypes: [
            'dinner'
        ],
        difficulty: 'easy',
        prepTime: 15,
        cookTime: 360,
        totalTime: 375,
        prepTimeMinutes: 15,
        cookTimeMinutes: 360,
        totalTimeMinutes: 375,
        servings: 6,
        calories: 480,
        protein: 45,
        carbs: 6,
        fat: 28,
        fiber: 2,
        proteinGrams: 45,
        carbohydratesGrams: 6,
        fatGrams: 28,
        fiberGrams: 2,
        dietary: [
            'High-Protein',
            'Keto',
            'Gluten-Free',
            'Dairy-Free'
        ],
        dietaryTags: [
            'High-Protein',
            'Keto',
            'Gluten-Free',
            'Dairy-Free'
        ],
        allergens: [],
        appliances: [
            'Slow Cooker',
            'Instant Pot'
        ],
        applianceTags: [
            'Slow Cooker',
            'Instant Pot'
        ],
        cookingMethods: [
            'Slow cook'
        ],
        tags: [
            'barbacoa',
            'mexican',
            'slow-cooker',
            'beef',
            'keto',
            'meal-prep'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1000&q=80',
        ingredients: [
            {
                name: 'Beef Chuck Roast',
                amount: '1.2',
                unit: 'kg',
                category: 'Protein',
                note: 'cut into large 3-inch chunks'
            },
            {
                name: 'Chipotle Peppers in Adobo',
                amount: '3',
                unit: 'peppers + 2 tbsp sauce',
                category: 'Pantry'
            },
            {
                name: 'Garlic',
                amount: '5',
                unit: 'cloves',
                category: 'Produce'
            },
            {
                name: 'Beef Broth or Stock',
                amount: '1',
                unit: 'cup',
                category: 'Pantry'
            },
            {
                name: 'Apple Cider Vinegar & Lime Juice',
                amount: '2',
                unit: 'tbsp each',
                category: 'Pantry'
            },
            {
                name: 'Ground Cumin & Oregano',
                amount: '1',
                unit: 'tbsp each',
                category: 'Pantry'
            },
            {
                name: 'Ground Cloves',
                amount: '0.25',
                unit: 'tsp',
                category: 'Pantry'
            },
            {
                name: 'Bay Leaves',
                amount: '2',
                unit: 'whole',
                category: 'Pantry'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Blend Barbacoa Marinade',
                instruction: 'Blend chipotle peppers, adobo sauce, garlic, broth, vinegar, lime juice, cumin, oregano, cloves, salt, and pepper until smooth.',
                timerMinutes: 3
            },
            {
                step: 2,
                title: 'Layer in Slow Cooker',
                instruction: 'Place beef chunks in slow cooker bowl, pour marinade over all surfaces, and tuck in bay leaves.',
                timerMinutes: 2
            },
            {
                step: 3,
                title: 'Slow Cook',
                instruction: 'Cover and cook on LOW for 7-8 hours (or HIGH for 4-5 hours / Instant Pot High Pressure for 60 mins) until beef falls apart effortlessly.',
                timerMinutes: 360
            },
            {
                step: 4,
                title: 'Shred & Toss',
                instruction: 'Shred meat with two forks directly into the rich braising juices. Serve in tacos, burrito bowls, or salads.',
                timerMinutes: 5
            }
        ],
        tips: [
            'Toss shredded beef in its pan juices and broil for 3 minutes for crisp carnitas-style burnt ends.'
        ],
        substitutions: [
            {
                originalIngredient: 'Beef Chuck',
                substituteIngredient: 'Pork Shoulder or Boneless Chicken Thighs',
                ratio: '1:1',
                notes: 'Equally succulent braised pork carnitas.'
            }
        ],
        sourceType: 'seed',
        isPublic: true
    },
    // 18. Creamy Wild Mushroom & White Truffle Herb Risotto
    {
        id: 'rec_catalog_18',
        title: 'Creamy Wild Mushroom & Herb Arborio Risotto',
        slug: 'creamy-wild-mushroom-herb-arborio-risotto',
        description: 'Silky al dente Arborio rice slowly coaxed with simmering vegetable broth, caramelized cremini & shiitake mushrooms, butter, and freshly grated Parmigiano.',
        cuisine: 'Italian',
        region: 'Lombardy',
        mealType: 'dinner',
        mealTypes: [
            'dinner'
        ],
        difficulty: 'advanced',
        prepTime: 15,
        cookTime: 25,
        totalTime: 40,
        prepTimeMinutes: 15,
        cookTimeMinutes: 25,
        totalTimeMinutes: 40,
        servings: 3,
        calories: 460,
        protein: 14,
        carbs: 58,
        fat: 18,
        fiber: 4,
        proteinGrams: 14,
        carbohydratesGrams: 58,
        fatGrams: 18,
        fiberGrams: 4,
        dietary: [
            'Vegetarian',
            'Gluten-Free'
        ],
        dietaryTags: [
            'Vegetarian',
            'Gluten-Free'
        ],
        allergens: [
            'Milk'
        ],
        appliances: [
            'Stovetop'
        ],
        applianceTags: [
            'Stovetop'
        ],
        cookingMethods: [
            'Simmer',
            'Sauté'
        ],
        tags: [
            'risotto',
            'mushrooms',
            'italian',
            'parmesan',
            'vegetarian',
            'gourmet'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=80',
        ingredients: [
            {
                name: 'Arborio Rice',
                amount: '1',
                unit: 'cup',
                category: 'Grains'
            },
            {
                name: 'Mixed Wild Mushrooms (Cremini, Shiitake)',
                amount: '300',
                unit: 'g',
                category: 'Produce',
                note: 'sliced'
            },
            {
                name: 'Warm Vegetable or Chicken Broth',
                amount: '4',
                unit: 'cups',
                category: 'Pantry'
            },
            {
                name: 'Dry White Wine',
                amount: '0.5',
                unit: 'cup',
                category: 'Pantry'
            },
            {
                name: 'Shallot & Garlic',
                amount: '1 shallot + 2 cloves',
                unit: 'units',
                category: 'Produce',
                note: 'finely minced'
            },
            {
                name: 'Butter',
                amount: '2',
                unit: 'tbsp',
                category: 'Dairy & Eggs'
            },
            {
                name: 'Parmigiano-Reggiano',
                amount: '0.5',
                unit: 'cup',
                category: 'Dairy & Eggs',
                note: 'freshly grated'
            },
            {
                name: 'Fresh Thyme',
                amount: '1',
                unit: 'tbsp',
                category: 'Produce'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Brown Mushrooms',
                instruction: 'Melt 1 tbsp butter in a large sauté pan. Sear mushrooms until deep golden brown and caramelized. Season with salt, thyme, and transfer to a bowl.',
                timerMinutes: 6
            },
            {
                step: 2,
                title: 'Toast Rice (Tostatura)',
                instruction: 'In the same pan, heat olive oil. Sauté shallot and garlic for 2 minutes, then add Arborio rice. Toast grains for 2 minutes until edges become translucent.',
                timerMinutes: 3
            },
            {
                step: 3,
                title: 'Deglaze & Simmer',
                instruction: 'Pour in white wine, stirring until fully absorbed. Add warm broth one ladle at a time, stirring constantly until each ladle is absorbed before adding the next (approx 18 minutes).',
                timerMinutes: 18
            },
            {
                step: 4,
                title: 'Mantecatura (Emulsify)',
                instruction: 'Remove from heat. Vigorously beat in remaining cold butter, grated Parmigiano, and reserved sautéed mushrooms until luxuriously creamy.',
                timerMinutes: 2
            }
        ],
        tips: [
            'Keep your stock simmering in a saucepan beside the rice so you never cool the cooking starch.'
        ],
        substitutions: [
            {
                originalIngredient: 'Dry White Wine',
                substituteIngredient: '1 tbsp lemon juice + extra broth',
                ratio: '1:1',
                notes: 'Alcohol-free substitution.'
            }
        ],
        sourceType: 'seed',
        isPublic: true
    },
    // 19. Rich Japanese Miso Pork Chashu Ramen
    {
        id: 'rec_catalog_19',
        title: 'Rich Japanese Miso Ramen with Soft-Boiled Egg',
        slug: 'rich-japanese-miso-ramen-soft-boiled-egg',
        description: 'Chewy ramen noodles in a savory roasted red miso and ginger sesame broth topped with jammy soft-boiled egg, scallions, and nori seaweed.',
        cuisine: 'Japanese',
        region: 'Hokkaido',
        mealType: 'dinner',
        mealTypes: [
            'dinner',
            'lunch'
        ],
        difficulty: 'intermediate',
        prepTime: 15,
        cookTime: 15,
        totalTime: 30,
        prepTimeMinutes: 15,
        cookTimeMinutes: 15,
        totalTimeMinutes: 30,
        servings: 2,
        calories: 560,
        protein: 32,
        carbs: 64,
        fat: 20,
        fiber: 5,
        proteinGrams: 32,
        carbohydratesGrams: 64,
        fatGrams: 20,
        fiberGrams: 5,
        dietary: [
            'High-Protein'
        ],
        dietaryTags: [
            'High-Protein'
        ],
        allergens: [
            'Egg',
            'Soy',
            'Wheat'
        ],
        appliances: [
            'Stovetop'
        ],
        applianceTags: [
            'Stovetop'
        ],
        cookingMethods: [
            'Boil',
            'Simmer'
        ],
        tags: [
            'ramen',
            'japanese',
            'miso-ramen',
            'noodles',
            'soup',
            'comfort-food'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80',
        ingredients: [
            {
                name: 'Fresh or Dried Ramen Noodles',
                amount: '2',
                unit: 'portions (200g)',
                category: 'Pantry'
            },
            {
                name: 'Red or White Miso Paste',
                amount: '3',
                unit: 'tbsp',
                category: 'Pantry'
            },
            {
                name: 'Eggs (Jammy Ramen Eggs)',
                amount: '2',
                unit: 'large',
                category: 'Dairy & Eggs'
            },
            {
                name: 'Pork Tenderloin or Chicken',
                amount: '200',
                unit: 'g',
                category: 'Protein',
                note: 'sliced thin'
            },
            {
                name: 'Chicken or Dashi Stock',
                amount: '4',
                unit: 'cups',
                category: 'Pantry'
            },
            {
                name: 'Toasted Sesame Oil & Grated Ginger',
                amount: '1',
                unit: 'tbsp each',
                category: 'Pantry'
            },
            {
                name: 'Baby Bok Choy & Green Onions',
                amount: '1',
                unit: 'cup',
                category: 'Produce'
            }
        ],
        instructions: [
            {
                step: 1,
                title: '6.5 Minute Jammy Eggs',
                instruction: 'Lower cold eggs into boiling water for exactly 6 minutes and 30 seconds. Transfer immediately to ice water. Peel after 3 minutes.',
                timerMinutes: 7
            },
            {
                step: 2,
                title: 'Build Miso Broth',
                instruction: 'Heat sesame oil in a saucepan. Sauté grated ginger and garlic for 1 minute. Add stock and bring to a simmer. Whisk in miso paste through a small strainer until completely dissolved.',
                timerMinutes: 5
            },
            {
                step: 3,
                title: 'Cook Meat & Bok Choy',
                instruction: 'Poach sliced pork or chicken and halved baby bok choy directly in the simmering broth for 3 minutes.',
                timerMinutes: 3
            },
            {
                step: 4,
                title: 'Boil Noodles & Assemble',
                instruction: 'Cook ramen noodles separately for 2 minutes. Divide noodles into deep bowls, pour boiling miso broth with meat and greens, and top with halved jammy egg and scallions.',
                timerMinutes: 2
            }
        ],
        tips: [
            'Never boil miso vigorously—extreme boiling damages its delicate aroma and beneficial enzymes.'
        ],
        substitutions: [
            {
                originalIngredient: 'Pork Tenderloin',
                substituteIngredient: 'Pan-seared Tofu or Shiitake mushrooms',
                ratio: '1:1',
                notes: 'Vegetarian ramen option.'
            }
        ],
        sourceType: 'seed',
        isPublic: true
    },
    // 20. Spicy Thai Basil Chicken (Pad Krapow Gai)
    {
        id: 'rec_catalog_20',
        title: 'Authentic Thai Holy Basil Chicken (Pad Krapow)',
        slug: 'authentic-thai-holy-basil-chicken-pad-krapow',
        description: 'Minced chicken wok-fried intensely with Thai bird\'s eye chilies, garlic, sweet soy sauce, and aromatic fresh basil topped with a crispy-edged fried egg.',
        cuisine: 'Thai',
        region: 'Central Thailand',
        mealType: 'dinner',
        mealTypes: [
            'dinner',
            'lunch'
        ],
        difficulty: 'easy',
        prepTime: 8,
        cookTime: 7,
        totalTime: 15,
        prepTimeMinutes: 8,
        cookTimeMinutes: 7,
        totalTimeMinutes: 15,
        servings: 2,
        calories: 470,
        protein: 42,
        carbs: 38,
        fat: 16,
        fiber: 2,
        proteinGrams: 42,
        carbohydratesGrams: 38,
        fatGrams: 16,
        fiberGrams: 2,
        dietary: [
            'High-Protein',
            'Dairy-Free'
        ],
        dietaryTags: [
            'High-Protein',
            'Dairy-Free'
        ],
        allergens: [
            'Egg',
            'Soy'
        ],
        appliances: [
            'Stovetop'
        ],
        applianceTags: [
            'Stovetop'
        ],
        cookingMethods: [
            'Sauté'
        ],
        tags: [
            'thai',
            'pad-krapow',
            'spicy',
            'chicken',
            'under-15-min',
            'street-food'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1000&q=80',
        ingredients: [
            {
                name: 'Ground Chicken or Minced Breast',
                amount: '350',
                unit: 'g',
                category: 'Protein'
            },
            {
                name: 'Fresh Thai Basil or Italian Basil',
                amount: '1.5',
                unit: 'cups',
                category: 'Produce',
                note: 'leaves picked'
            },
            {
                name: 'Garlic & Thai Bird Chilis',
                amount: '5 cloves garlic + 2 chilis',
                unit: 'pounded in mortar',
                category: 'Produce'
            },
            {
                name: 'Oyster Sauce & Dark Soy Sauce',
                amount: '1',
                unit: 'tbsp each',
                category: 'Condiments'
            },
            {
                name: 'Fish Sauce or Light Soy Sauce',
                amount: '1',
                unit: 'tbsp',
                category: 'Condiments'
            },
            {
                name: 'Brown Sugar',
                amount: '1',
                unit: 'tsp',
                category: 'Pantry'
            },
            {
                name: 'Eggs (for crispy fried egg)',
                amount: '2',
                unit: 'large',
                category: 'Dairy & Eggs'
            },
            {
                name: 'Cooked Jasmine Rice',
                amount: '1.5',
                unit: 'cups',
                category: 'Grains'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Crispy Fried Eggs (Khai Dao)',
                instruction: 'Heat 2 tbsp oil in a wok over high heat. Crack eggs into sizzling oil and baste hot oil over yolk until edges are lacey and blistered crispy. Transfer to plate.',
                timerMinutes: 2
            },
            {
                step: 2,
                title: 'Wok-Fry Aromatics',
                instruction: 'Pour out excess oil leaving 1 tbsp. Add crushed garlic and chilis, tossing for 20 seconds until fragrant.',
                timerMinutes: 1
            },
            {
                step: 3,
                title: 'Sear Chicken & Glaze',
                instruction: 'Add minced chicken, breaking apart over high heat. Add oyster sauce, soy sauce, fish sauce, and sugar. Sauté for 3 minutes until chicken is cooked through.',
                timerMinutes: 3
            },
            {
                step: 4,
                title: 'Wilt Basil & Serve',
                instruction: 'Turn off heat. Throw in fresh basil leaves and toss for 20 seconds until just wilted. Spoon over hot jasmine rice and crown with crispy fried egg.',
                timerMinutes: 1
            }
        ],
        tips: [
            'Turn off the heat before adding basil leaves to keep their vibrant aroma and avoid bitterness.'
        ],
        substitutions: [
            {
                originalIngredient: 'Ground Chicken',
                substituteIngredient: 'Minced Pork or Crumbled Tofu',
                ratio: '1:1',
                notes: 'Traditional Thai variations.'
            }
        ],
        sourceType: 'seed',
        isPublic: true
    },
    // 21. Aromatic North Indian Chana Masala
    {
        id: 'rec_catalog_21',
        title: 'Aromatic North Indian Chana Masala (Spiced Chickpeas)',
        slug: 'aromatic-north-indian-chana-masala-spiced-chickpeas',
        description: 'Tender chickpeas simmered in a tangy ginger, tomato, onion, and pomegranate powder sauce infused with toasted cumin, amchur, and garam masala.',
        cuisine: 'Indian',
        region: 'Punjab',
        mealType: 'lunch',
        mealTypes: [
            'lunch',
            'dinner'
        ],
        difficulty: 'easy',
        prepTime: 10,
        cookTime: 20,
        totalTime: 30,
        prepTimeMinutes: 10,
        cookTimeMinutes: 20,
        totalTimeMinutes: 30,
        servings: 3,
        calories: 380,
        protein: 16,
        carbs: 56,
        fat: 10,
        fiber: 14,
        proteinGrams: 16,
        carbohydratesGrams: 56,
        fatGrams: 10,
        fiberGrams: 14,
        dietary: [
            'Vegan',
            'Vegetarian',
            'Gluten-Free',
            'Dairy-Free',
            'High-Fiber'
        ],
        dietaryTags: [
            'Vegan',
            'Vegetarian',
            'Gluten-Free',
            'Dairy-Free',
            'High-Fiber'
        ],
        allergens: [],
        appliances: [
            'Stovetop'
        ],
        applianceTags: [
            'Stovetop'
        ],
        cookingMethods: [
            'Simmer',
            'Sauté'
        ],
        tags: [
            'chana-masala',
            'indian',
            'vegan',
            'chickpeas',
            'gluten-free',
            'high-fiber'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=80',
        ingredients: [
            {
                name: 'Cooked Chickpeas (Garbanzo)',
                amount: '2',
                unit: 'cans (800g)',
                category: 'Pantry',
                note: 'rinsed and drained'
            },
            {
                name: 'Finely Diced Yellow Onion',
                amount: '1',
                unit: 'large',
                category: 'Produce'
            },
            {
                name: 'Canned Crushed Tomatoes',
                amount: '1.5',
                unit: 'cups',
                category: 'Pantry'
            },
            {
                name: 'Fresh Ginger & Garlic Paste',
                amount: '1.5',
                unit: 'tbsp',
                category: 'Produce'
            },
            {
                name: 'Ground Cumin & Coriander',
                amount: '1',
                unit: 'tbsp each',
                category: 'Pantry'
            },
            {
                name: 'Garam Masala & Turmeric',
                amount: '1',
                unit: 'tsp each',
                category: 'Pantry'
            },
            {
                name: 'Fresh Lemon Juice & Cilantro',
                amount: '2',
                unit: 'tbsp each',
                category: 'Produce'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Brown the Onions',
                instruction: 'Heat oil in a heavy Dutch oven over medium heat. Sauté diced onions for 8 minutes until golden and deeply caramelized.',
                timerMinutes: 8
            },
            {
                step: 2,
                title: 'Bloom the Masala',
                instruction: 'Add ginger-garlic paste, cumin, coriander, turmeric, and garam masala. Sauté for 1 minute until fragrant.',
                timerMinutes: 1
            },
            {
                step: 3,
                title: 'Simmer Chickpeas',
                instruction: 'Add crushed tomatoes and 1/2 cup water. Add chickpeas. Simmer for 10 minutes, lightly mashing a handful of chickpeas against the side of the pot to thicken gravy.',
                timerMinutes: 10
            },
            {
                step: 4,
                title: 'Lemon & Herbs',
                instruction: 'Finish with fresh lemon juice and chopped fresh cilantro. Serve with basmati rice or warm roti.',
                timerMinutes: 1
            }
        ],
        tips: [
            'Mashing a few spoonfuls of chickpeas directly in the pot creates a velvety restaurant gravy without needing heavy cream or starches.'
        ],
        substitutions: [
            {
                originalIngredient: 'Chickpeas',
                substituteIngredient: 'Black beans or Kidney beans (Rajma)',
                ratio: '1:1',
                notes: 'Makes rich Punjabi Rajma.'
            }
        ],
        sourceType: 'seed',
        isPublic: true
    },
    // 22. Silky Dark Chocolate Avocado Protein Mousse
    {
        id: 'rec_catalog_22',
        title: 'Silky Dark Chocolate Avocado Protein Mousse',
        slug: 'silky-dark-chocolate-avocado-protein-mousse',
        description: 'A decadent, velvety chocolate mousse whipped with ripe avocado, dutch cocoa, pure maple syrup, and vanilla that tastes like pure pastry chef luxury.',
        cuisine: 'American',
        region: 'California',
        mealType: 'dessert',
        mealTypes: [
            'dessert',
            'snack'
        ],
        difficulty: 'beginner',
        prepTime: 6,
        cookTime: 0,
        totalTime: 6,
        prepTimeMinutes: 6,
        cookTimeMinutes: 0,
        totalTimeMinutes: 6,
        servings: 2,
        calories: 260,
        protein: 8,
        carbs: 28,
        fat: 16,
        fiber: 9,
        proteinGrams: 8,
        carbohydratesGrams: 28,
        fatGrams: 16,
        fiberGrams: 9,
        dietary: [
            'Vegan',
            'Vegetarian',
            'Gluten-Free',
            'Dairy-Free'
        ],
        dietaryTags: [
            'Vegan',
            'Vegetarian',
            'Gluten-Free',
            'Dairy-Free'
        ],
        allergens: [],
        appliances: [
            'Blender',
            'Food Processor'
        ],
        applianceTags: [
            'Blender',
            'Food Processor'
        ],
        cookingMethods: [
            'Raw / Toss'
        ],
        tags: [
            'dessert',
            'chocolate-mousse',
            'avocado',
            'healthy-dessert',
            'vegan',
            'guilt-free'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
        ingredients: [
            {
                name: 'Ripe Hass Avocados',
                amount: '2',
                unit: 'medium',
                category: 'Produce',
                note: 'pitted and peeled'
            },
            {
                name: 'Dutch Process Cocoa Powder',
                amount: '0.33',
                unit: 'cup',
                category: 'Pantry'
            },
            {
                name: 'Pure Maple Syrup',
                amount: '0.33',
                unit: 'cup',
                category: 'Pantry'
            },
            {
                name: 'Almond Milk or Oat Milk',
                amount: '0.25',
                unit: 'cup',
                category: 'Dairy & Eggs'
            },
            {
                name: 'Pure Vanilla Extract & Pinch Sea Salt',
                amount: '1',
                unit: 'tsp',
                category: 'Pantry'
            },
            {
                name: 'Fresh Raspberries',
                amount: '0.5',
                unit: 'cup',
                category: 'Produce',
                note: 'for topping'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Blend Ingredients',
                instruction: 'Combine avocados, cocoa powder, maple syrup, almond milk, vanilla, and salt in a high-speed blender or food processor.',
                timerMinutes: 2
            },
            {
                step: 2,
                title: 'Purée to Silk',
                instruction: 'Purée on high for 2 minutes, scraping down sides once, until glossy, light, and completely smooth with zero avocado flavor.',
                timerMinutes: 2
            },
            {
                step: 3,
                title: 'Chill & Garnish',
                instruction: 'Spoon into dessert ramekins and chill in refrigerator for 30 minutes. Garnish with fresh tart raspberries.',
                timerMinutes: 2
            }
        ],
        tips: [
            'The natural fats in avocado create a texture indistinguishable from French heavy cream chocolate mousse.'
        ],
        substitutions: [
            {
                originalIngredient: 'Maple Syrup',
                substituteIngredient: 'Monkfruit sweetener syrup',
                ratio: '1:1',
                notes: 'Drastically reduces sugar for a keto treat.'
            }
        ],
        sourceType: 'seed',
        isPublic: true
    },
    // 23. Sheet-Pan Baked Lemon Herb Cod with Roasted Vegetables
    {
        id: 'rec_catalog_23',
        title: 'Sheet-Pan Mediterranean Baked Cod with Zucchini & Tomatoes',
        slug: 'sheet-pan-mediterranean-baked-cod-zucchini-tomatoes',
        description: 'Flaky Atlantic cod fillets baked on one sheet pan with sweet cherry tomatoes, tender zucchini discs, kalamata olives, and fresh dill vinaigrette.',
        cuisine: 'Mediterranean',
        region: 'Greek Coast',
        mealType: 'dinner',
        mealTypes: [
            'dinner'
        ],
        difficulty: 'easy',
        prepTime: 10,
        cookTime: 16,
        totalTime: 26,
        prepTimeMinutes: 10,
        cookTimeMinutes: 16,
        totalTimeMinutes: 26,
        servings: 2,
        calories: 340,
        protein: 38,
        carbs: 12,
        fat: 14,
        fiber: 4,
        proteinGrams: 38,
        carbohydratesGrams: 12,
        fatGrams: 14,
        fiberGrams: 4,
        dietary: [
            'High-Protein',
            'Pescatarian',
            'Gluten-Free',
            'Dairy-Free',
            'Keto',
            'Low-Calorie'
        ],
        dietaryTags: [
            'High-Protein',
            'Pescatarian',
            'Gluten-Free',
            'Dairy-Free',
            'Keto',
            'Low-Calorie'
        ],
        allergens: [
            'Fish'
        ],
        appliances: [
            'Oven'
        ],
        applianceTags: [
            'Oven'
        ],
        cookingMethods: [
            'Bake',
            'Roast'
        ],
        tags: [
            'baked-cod',
            'sheet-pan',
            'pescatarian',
            'low-calorie',
            'mediterranean',
            'healthy-dinner'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80',
        ingredients: [
            {
                name: 'Cod Fillets or Halibut',
                amount: '2',
                unit: 'fillets (approx 350g)',
                category: 'Protein'
            },
            {
                name: 'Cherry Tomatoes',
                amount: '1.5',
                unit: 'cups',
                category: 'Produce'
            },
            {
                name: 'Zucchini',
                amount: '1',
                unit: 'medium',
                category: 'Produce',
                note: 'sliced into half-moons'
            },
            {
                name: 'Kalamata Olives',
                amount: '0.25',
                unit: 'cup',
                category: 'Pantry',
                note: 'halved'
            },
            {
                name: 'Extra Virgin Olive Oil',
                amount: '1.5',
                unit: 'tbsp',
                category: 'Pantry'
            },
            {
                name: 'Fresh Lemon & Dill',
                amount: '1 lemon + 2 tbsp dill',
                unit: 'units',
                category: 'Produce'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Toss Vegetables',
                instruction: 'Toss cherry tomatoes, zucchini slices, and kalamata olives on a baking sheet with 1 tbsp olive oil, oregano, salt, and pepper.',
                timerMinutes: 3
            },
            {
                step: 2,
                title: 'Season Fish',
                instruction: 'Nestle cod fillets among vegetables. Drizzle fish with remaining olive oil and lemon juice, and season with sea salt and fresh chopped dill.',
                timerMinutes: 2
            },
            {
                step: 3,
                title: 'Bake to Flaky Perfection',
                instruction: 'Bake at 400°F (200°C) for 15-17 minutes until tomatoes burst, zucchini is tender, and cod flakes gently with a fork.',
                timerMinutes: 16
            }
        ],
        tips: [
            'Cod is done when it registers 140°F (60°C) internally—avoid overcooking white fish.'
        ],
        substitutions: [
            {
                originalIngredient: 'Cod Fillets',
                substituteIngredient: 'Salmon or Tilapia fillets',
                ratio: '1:1',
                notes: 'Adapts to any fresh white fish or salmon.'
            }
        ],
        sourceType: 'seed',
        isPublic: true
    },
    // 24. Low-Carb Zucchini Ribbon Lasagna with Ricotta & Marinara
    {
        id: 'rec_catalog_24',
        title: 'Low-Carb Zucchini Ribbon Lasagna with Whipped Ricotta',
        slug: 'low-carb-zucchini-ribbon-lasagna-whipped-ricotta',
        description: 'Thin ribboned zucchini layers baked with rich Italian marinara, herb-seasoned whipped ricotta, melted mozzarella, and fresh basil leaves.',
        cuisine: 'Italian',
        region: 'Rome',
        mealType: 'dinner',
        mealTypes: [
            'dinner'
        ],
        difficulty: 'intermediate',
        prepTime: 20,
        cookTime: 25,
        totalTime: 45,
        prepTimeMinutes: 20,
        cookTimeMinutes: 25,
        totalTimeMinutes: 45,
        servings: 4,
        calories: 320,
        protein: 22,
        carbs: 14,
        fat: 20,
        fiber: 4,
        proteinGrams: 22,
        carbohydratesGrams: 14,
        fatGrams: 20,
        fiberGrams: 4,
        dietary: [
            'Vegetarian',
            'Gluten-Free',
            'Keto',
            'Low-Carb'
        ],
        dietaryTags: [
            'Vegetarian',
            'Gluten-Free',
            'Keto',
            'Low-Carb'
        ],
        allergens: [
            'Milk'
        ],
        appliances: [
            'Oven'
        ],
        applianceTags: [
            'Oven'
        ],
        cookingMethods: [
            'Bake'
        ],
        tags: [
            'lasagna',
            'zucchini-lasagna',
            'low-carb',
            'keto',
            'vegetarian',
            'comfort-food'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281724?auto=format&fit=crop&w=1000&q=80',
        ingredients: [
            {
                name: 'Zucchini',
                amount: '3',
                unit: 'large',
                category: 'Produce',
                note: 'sliced lengthwise into wide ribbons with peeler'
            },
            {
                name: 'Whole Milk Ricotta Cheese',
                amount: '1.5',
                unit: 'cups',
                category: 'Dairy & Eggs'
            },
            {
                name: 'Shredded Mozzarella Cheese',
                amount: '1.5',
                unit: 'cups',
                category: 'Dairy & Eggs'
            },
            {
                name: 'Parmesan Cheese',
                amount: '0.33',
                unit: 'cup',
                category: 'Dairy & Eggs',
                note: 'grated'
            },
            {
                name: 'Marinara Tomato Sauce',
                amount: '1.5',
                unit: 'cups',
                category: 'Pantry'
            },
            {
                name: 'Egg',
                amount: '1',
                unit: 'large',
                category: 'Dairy & Eggs',
                note: 'beaten into ricotta'
            },
            {
                name: 'Fresh Basil & Oregano',
                amount: '2',
                unit: 'tbsp',
                category: 'Produce'
            }
        ],
        instructions: [
            {
                step: 1,
                title: 'Salt & Sweat Zucchini',
                instruction: 'Lay zucchini ribbons on paper towels, sprinkle lightly with salt, and let rest 10 minutes. Pat thoroughly dry with more paper towels.',
                timerMinutes: 10,
                tip: 'Removing moisture prevents a watery zucchini lasagna.'
            },
            {
                step: 2,
                title: 'Mix Ricotta Filling',
                instruction: 'Whisk ricotta, egg, half the parmesan, oregano, chopped basil, salt, and pepper in a bowl.',
                timerMinutes: 3
            },
            {
                step: 3,
                title: 'Layer Lasagna',
                instruction: 'Spread 1/2 cup marinara in a baking dish. Layer zucchini ribbons, ricotta mixture, marinara, and mozzarella. Repeat for 3 full layers, finishing with mozzarella and parmesan.',
                timerMinutes: 5
            },
            {
                step: 4,
                title: 'Bake to Golden Bubble',
                instruction: 'Bake at 375°F (190°C) for 25 minutes until bubbly and golden brown. Let rest 10 minutes before slicing.',
                timerMinutes: 25
            }
        ],
        tips: [
            'Let lasagna rest for 10 minutes after baking so clean square portions can be cut easily.'
        ],
        substitutions: [
            {
                originalIngredient: 'Ricotta Cheese',
                substituteIngredient: 'Silken Tofu blended with lemon & nutritional yeast',
                ratio: '1:1',
                notes: 'Vegan cheese replacement.'
            }
        ],
        sourceType: 'seed',
        isPublic: true
    }
];
const SEED_RECIPES = RAW_SEED_RECIPES.map(_c = (r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeRecipeData"])(r));
_c1 = SEED_RECIPES;
var _c, _c1;
__turbopack_context__.k.register(_c, "SEED_RECIPES$RAW_SEED_RECIPES.map");
__turbopack_context__.k.register(_c1, "SEED_RECIPES");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiFetch",
    ()=>apiFetch,
    "getAuthHeaders",
    ()=>getAuthHeaders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-client] (ecmascript)");
;
async function getAuthHeaders() {
    const headers = {
        'Content-Type': 'application/json'
    };
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (user) {
        headers['Authorization'] = `Bearer ${user.uid}`;
        headers['x-user-id'] = user.uid;
    } else {
        headers['Authorization'] = 'Bearer guest_user';
        headers['x-user-id'] = 'guest_user';
    }
    return headers;
}
async function apiFetch(endpoint, options = {}) {
    const authHeaders = await getAuthHeaders();
    const mergedHeaders = {
        ...authHeaders,
        ...options.headers || {}
    };
    const response = await fetch(endpoint, {
        ...options,
        headers: mergedHeaders
    });
    const data = await response.json().catch(()=>null);
    if (!response.ok) {
        const errorMsg = data?.error || data?.message || `Request failed with status ${response.status}`;
        throw new Error(errorMsg);
    }
    return data;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Standalone Local Authentication Service
 * Supports Google sign-in (one-click profile creation), Email/Password sign-up and sign-in,
 * Phone SMS verification, and Anonymous Guest access.
 * Persists accounts and active session in browser localStorage.
 */ __turbopack_context__.s([
    "getCurrentUser",
    ()=>getCurrentUser,
    "getFriendlyAuthErrorMessage",
    ()=>getFriendlyAuthErrorMessage,
    "isMobileDevice",
    ()=>isMobileDevice,
    "onAuthStateChanged",
    ()=>onAuthStateChanged,
    "processRedirectResult",
    ()=>processRedirectResult,
    "resetPassword",
    ()=>resetPassword,
    "sendPhoneCode",
    ()=>sendPhoneCode,
    "setupRecaptchaVerifier",
    ()=>setupRecaptchaVerifier,
    "signInAsGuest",
    ()=>signInAsGuest,
    "signInWithEmail",
    ()=>signInWithEmail,
    "signInWithGoogleFlow",
    ()=>signInWithGoogleFlow,
    "signOutUser",
    ()=>signOutUser,
    "signUpWithEmail",
    ()=>signUpWithEmail,
    "verifyPhoneCode",
    ()=>verifyPhoneCode
]);
const STORAGE_USERS_KEY = 'mealai_auth_users';
const STORAGE_CURRENT_USER_KEY = 'mealai_auth_current_user';
const authListeners = new Set();
function notifyAuthListeners(user) {
    authListeners.forEach((listener)=>{
        try {
            listener(user);
        } catch (e) {
            console.error('[Local Auth] Listener error:', e);
        }
    });
}
function getStoredUsers() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = localStorage.getItem(STORAGE_USERS_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch  {
        return {};
    }
}
function saveStoredUsers(users) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    } catch (e) {
        console.error('[Local Auth] Failed to save users:', e);
    }
}
function createAuthUserObject(data) {
    const uid = data.uid || `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    return {
        uid,
        email: data.email || null,
        displayName: data.displayName || null,
        photoURL: data.photoURL || null,
        phoneNumber: data.phoneNumber || null,
        isAnonymous: !!data.isAnonymous,
        emailVerified: data.emailVerified ?? true,
        metadata: data.metadata || {
            creationTime: new Date().toISOString(),
            lastSignInTime: new Date().toISOString()
        },
        providerData: data.providerData || [
            {
                providerId: data.isAnonymous ? 'anonymous' : 'password',
                uid,
                email: data.email || null,
                displayName: data.displayName || null
            }
        ],
        getIdToken: async ()=>uid
    };
}
function getCurrentUser() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
        if (!raw) return null;
        const data = JSON.parse(raw);
        return createAuthUserObject(data);
    } catch  {
        return null;
    }
}
function setCurrentUser(user) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        if (user) {
            localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
        }
        notifyAuthListeners(user);
    } catch (e) {
        console.error('[Local Auth] Failed to set current user:', e);
    }
}
function onAuthStateChanged(_authOrCallback, callback) {
    const cb = typeof _authOrCallback === 'function' ? _authOrCallback : callback;
    if (!cb) return ()=>{};
    authListeners.add(cb);
    // Trigger initial callback asynchronously
    setTimeout(()=>{
        cb(getCurrentUser());
    }, 0);
    return ()=>{
        authListeners.delete(cb);
    };
}
const isMobileDevice = ()=>{
    if (("TURBOPACK compile-time value", "object") === 'undefined' || typeof navigator === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};
function getFriendlyAuthErrorMessage(error) {
    if (!error) return 'An error occurred. Please try again.';
    const message = error.message || error.toString();
    return message;
}
async function signInWithGoogleFlow() {
    const user = createAuthUserObject({
        uid: 'google_user_' + Date.now().toString(36),
        displayName: 'Chef Alex',
        email: 'chef.alex@gmail.com',
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        isAnonymous: false,
        providerData: [
            {
                providerId: 'google.com',
                displayName: 'Chef Alex',
                email: 'chef.alex@gmail.com'
            }
        ]
    });
    setCurrentUser(user);
    return user;
}
async function processRedirectResult() {
    return null;
}
async function signInWithEmail(email, pass) {
    const cleanEmail = email.trim().toLowerCase();
    const users = getStoredUsers();
    const record = users[cleanEmail];
    if (!record) {
        // If not existing yet, create account seamlessly
        const newUser = createAuthUserObject({
            email: cleanEmail,
            displayName: cleanEmail.split('@')[0],
            isAnonymous: false
        });
        users[cleanEmail] = {
            passwordHash: pass,
            user: newUser
        };
        saveStoredUsers(users);
        setCurrentUser(newUser);
        return newUser;
    }
    if (record.passwordHash !== pass) {
        throw new Error('Email or password is incorrect. Please try again.');
    }
    const user = createAuthUserObject(record.user);
    setCurrentUser(user);
    return user;
}
async function signUpWithEmail(email, pass, name) {
    const cleanEmail = email.trim().toLowerCase();
    const users = getStoredUsers();
    const user = createAuthUserObject({
        email: cleanEmail,
        displayName: name.trim() || cleanEmail.split('@')[0],
        isAnonymous: false
    });
    users[cleanEmail] = {
        passwordHash: pass,
        user
    };
    saveStoredUsers(users);
    setCurrentUser(user);
    return user;
}
async function signOutUser() {
    setCurrentUser(null);
}
async function resetPassword(_email) {
    // Local password reset confirmed
    return;
}
function setupRecaptchaVerifier(_containerId) {
    return {
        clear: ()=>{}
    };
}
async function sendPhoneCode(phoneNumber, _verifier) {
    const cleanPhone = phoneNumber.trim();
    return {
        verificationId: 'mock_verification_' + Date.now(),
        confirm: async (_code)=>{
            const user = createAuthUserObject({
                uid: 'phone_' + cleanPhone.replace(/\D/g, ''),
                phoneNumber: cleanPhone,
                displayName: `Chef (${cleanPhone.slice(-4)})`,
                isAnonymous: false,
                providerData: [
                    {
                        providerId: 'phone',
                        phoneNumber: cleanPhone
                    }
                ]
            });
            setCurrentUser(user);
            return {
                user
            };
        }
    };
}
async function verifyPhoneCode(confirmationResult, verificationCode) {
    const result = await confirmationResult.confirm(verificationCode);
    return result.user;
}
async function signInAsGuest() {
    const guestUser = createAuthUserObject({
        uid: 'guest_' + Math.random().toString(36).substring(2, 9),
        displayName: 'Guest Chef',
        email: 'guest@mealai.app',
        isAnonymous: true
    });
    setCurrentUser(guestUser);
    return guestUser;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/db.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OperationType",
    ()=>OperationType,
    "addFavoriteToFirestore",
    ()=>addFavoriteToFirestore,
    "app",
    ()=>app,
    "auth",
    ()=>auth,
    "calculateRecipePantryMatch",
    ()=>calculateRecipePantryMatch,
    "db",
    ()=>db,
    "deleteCookingChat",
    ()=>deleteCookingChat,
    "deleteGroceryItem",
    ()=>deleteGroceryItem,
    "deletePantryItem",
    ()=>deletePantryItem,
    "deleteRecipeFromFirestore",
    ()=>deleteRecipeFromFirestore,
    "getApp",
    ()=>getApp,
    "getAuth",
    ()=>getAuth,
    "getCatalogIngredients",
    ()=>getCatalogIngredients,
    "getCatalogRecipeById",
    ()=>getCatalogRecipeById,
    "getCatalogRecipeBySlug",
    ()=>getCatalogRecipeBySlug,
    "getCatalogRecipes",
    ()=>getCatalogRecipes,
    "getCatalogRecipesPaginated",
    ()=>getCatalogRecipesPaginated,
    "getCatalogTaxonomies",
    ()=>getCatalogTaxonomies,
    "getFirestore",
    ()=>getFirestore,
    "getStorage",
    ()=>getStorage,
    "getUserAIHistory",
    ()=>getUserAIHistory,
    "getUserCookingChats",
    ()=>getUserCookingChats,
    "getUserFavorites",
    ()=>getUserFavorites,
    "getUserGeneratedRecipes",
    ()=>getUserGeneratedRecipes,
    "getUserGroceryItems",
    ()=>getUserGroceryItems,
    "getUserMealPlans",
    ()=>getUserMealPlans,
    "getUserPantry",
    ()=>getUserPantry,
    "getUserProfile",
    ()=>getUserProfile,
    "getUserRecipes",
    ()=>getUserRecipes,
    "googleProvider",
    ()=>googleProvider,
    "handleFirestoreError",
    ()=>handleFirestoreError,
    "loadFullCatalog",
    ()=>loadFullCatalog,
    "removeFavoriteFromFirestore",
    ()=>removeFavoriteFromFirestore,
    "saveAIHistoryRecord",
    ()=>saveAIHistoryRecord,
    "saveCookingChat",
    ()=>saveCookingChat,
    "saveGeneratedRecipeToFirestore",
    ()=>saveGeneratedRecipeToFirestore,
    "saveGroceryItem",
    ()=>saveGroceryItem,
    "saveMealPlanToFirestore",
    ()=>saveMealPlanToFirestore,
    "savePantryItem",
    ()=>savePantryItem,
    "saveRecipeToFirestore",
    ()=>saveRecipeToFirestore,
    "saveUserProfile",
    ()=>saveUserProfile,
    "seedCatalogDatabaseIfEmpty",
    ()=>seedCatalogDatabaseIfEmpty,
    "storage",
    ()=>storage,
    "testConnection",
    ()=>testConnection,
    "toggleGroceryChecked",
    ()=>toggleGroceryChecked,
    "toggleRecipeFavorite",
    ()=>toggleRecipeFavorite,
    "updateGroceryItemInFirestore",
    ()=>updateGroceryItemInFirestore,
    "updatePantryItemInFirestore",
    ()=>updatePantryItemInFirestore,
    "uploadImageToFirebaseStorage",
    ()=>uploadImageToFirebaseStorage,
    "uploadRecipeOrUserImage",
    ()=>uploadRecipeOrUserImage
]);
/**
 * Local Data Storage Layer
 * High-performance, persistent browser local storage and in-memory caches.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$seedCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/seedCatalog.ts [app-client] (ecmascript)");
;
;
// ---------------- LOCAL STORAGE HELPERS ----------------
function getStorageItem(key, defaultValue) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : defaultValue;
    } catch (e) {
        console.warn(`[Local DB] Failed to parse localStorage item "${key}":`, e);
        return defaultValue;
    }
}
function setStorageItem(key, value) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error(`[Local DB] Failed to save localStorage item "${key}":`, e);
    }
}
var OperationType = /*#__PURE__*/ function(OperationType) {
    OperationType["CREATE"] = "create";
    OperationType["UPDATE"] = "update";
    OperationType["DELETE"] = "delete";
    OperationType["LIST"] = "list";
    OperationType["GET"] = "get";
    OperationType["WRITE"] = "write";
    return OperationType;
}({});
function handleFirestoreError(error, operationType, path) {
    const errInfo = {
        error: error instanceof Error ? error.message : String(error),
        operationType,
        path
    };
    console.error('[Local DB Error]:', errInfo);
    throw new Error(JSON.stringify(errInfo));
}
const app = {
    name: 'mealai-local',
    options: {}
};
const auth = {
    currentUser: null
};
const db = {
    type: 'local-db'
};
const storage = {
    type: 'local-storage'
};
const googleProvider = {};
const getApp = ()=>app;
const getAuth = ()=>auth;
const getFirestore = ()=>db;
const getStorage = ()=>storage;
async function testConnection() {
    return {
        firestore: true,
        auth: true
    };
}
// ---------------- USER PROFILE SERVICES ----------------
const STORAGE_USERS_KEY = 'mealai_local_user_profiles';
async function getUserProfile(userId) {
    const profiles = getStorageItem(STORAGE_USERS_KEY, {});
    return profiles[userId] || null;
}
async function saveUserProfile(profile) {
    const profiles = getStorageItem(STORAGE_USERS_KEY, {});
    profiles[profile.id] = {
        ...profile,
        updatedAt: new Date().toISOString()
    };
    setStorageItem(STORAGE_USERS_KEY, profiles);
}
// ---------------- RECIPE SERVICES ----------------
const STORAGE_RECIPES_KEY = 'mealai_local_recipes';
async function saveRecipeToFirestore(recipe) {
    const recipes = getStorageItem(STORAGE_RECIPES_KEY, {});
    recipes[recipe.id] = {
        ...recipe,
        updatedAt: new Date().toISOString()
    };
    setStorageItem(STORAGE_RECIPES_KEY, recipes);
}
const STORAGE_GENERATED_RECIPES_KEY = 'mealai_local_generated_recipes';
async function saveGeneratedRecipeToFirestore(userId, recipe) {
    const allGen = getStorageItem(STORAGE_GENERATED_RECIPES_KEY, {});
    allGen[recipe.id] = {
        ...recipe,
        userId,
        updatedAt: new Date().toISOString()
    };
    setStorageItem(STORAGE_GENERATED_RECIPES_KEY, allGen);
}
async function getUserGeneratedRecipes(userId) {
    const allGen = getStorageItem(STORAGE_GENERATED_RECIPES_KEY, {});
    return Object.values(allGen).filter((r)=>r.userId === userId);
}
const STORAGE_COOKING_CHATS_KEY = 'mealai_local_cooking_chats';
async function saveCookingChat(userId, chat) {
    const stored = {
        ...chat,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    const allChats = getStorageItem(STORAGE_COOKING_CHATS_KEY, {});
    allChats[chat.id] = stored;
    setStorageItem(STORAGE_COOKING_CHATS_KEY, allChats);
}
async function getUserCookingChats(userId, recipeId) {
    const allChats = getStorageItem(STORAGE_COOKING_CHATS_KEY, {});
    const list = Object.values(allChats);
    return recipeId ? list.filter((c)=>c.recipeId === recipeId) : list;
}
async function deleteCookingChat(userId, chatId) {
    const allChats = getStorageItem(STORAGE_COOKING_CHATS_KEY, {});
    delete allChats[chatId];
    setStorageItem(STORAGE_COOKING_CHATS_KEY, allChats);
}
async function uploadImageToFirebaseStorage(userId, file, filename = `upload_${Date.now()}.jpg`) {
    // Convert file/blob to data URL (local-only)
    return new Promise((resolve)=>{
        const reader = new FileReader();
        reader.onloadend = ()=>resolve(reader.result);
        reader.readAsDataURL(file);
    });
}
async function getUserRecipes(userId) {
    const recipes = getStorageItem(STORAGE_RECIPES_KEY, {});
    return Object.values(recipes).filter((r)=>r.userId === userId);
}
async function toggleRecipeFavorite(recipeId, isFavorite) {
    const recipes = getStorageItem(STORAGE_RECIPES_KEY, {});
    if (recipes[recipeId]) {
        recipes[recipeId] = {
            ...recipes[recipeId],
            isFavorite,
            updatedAt: new Date().toISOString()
        };
        setStorageItem(STORAGE_RECIPES_KEY, recipes);
    }
}
async function deleteRecipeFromFirestore(recipeId) {
    const recipes = getStorageItem(STORAGE_RECIPES_KEY, {});
    delete recipes[recipeId];
    setStorageItem(STORAGE_RECIPES_KEY, recipes);
}
// ---------------- MEAL PLAN SERVICES ----------------
const STORAGE_MEAL_PLANS_KEY = 'mealai_local_meal_plans';
async function saveMealPlanToFirestore(plan) {
    const plans = getStorageItem(STORAGE_MEAL_PLANS_KEY, {});
    plans[plan.id] = {
        ...plan,
        updatedAt: new Date().toISOString()
    };
    setStorageItem(STORAGE_MEAL_PLANS_KEY, plans);
}
async function getUserMealPlans(userId) {
    const plans = getStorageItem(STORAGE_MEAL_PLANS_KEY, {});
    return Object.values(plans).filter((p)=>p.userId === userId);
}
// ---------------- PANTRY SERVICES ----------------
const STORAGE_PANTRY_KEY = 'mealai_local_pantry';
async function getUserPantry(userId) {
    const allPantry = getStorageItem(STORAGE_PANTRY_KEY, {});
    return Object.values(allPantry).filter((p)=>p.userId === userId || p.userId === 'default');
}
async function savePantryItem(item) {
    const allPantry = getStorageItem(STORAGE_PANTRY_KEY, {});
    allPantry[item.id] = item;
    setStorageItem(STORAGE_PANTRY_KEY, allPantry);
}
async function deletePantryItem(itemId) {
    const allPantry = getStorageItem(STORAGE_PANTRY_KEY, {});
    delete allPantry[itemId];
    setStorageItem(STORAGE_PANTRY_KEY, allPantry);
}
async function updatePantryItemInFirestore(itemId, updates) {
    const allPantry = getStorageItem(STORAGE_PANTRY_KEY, {});
    if (allPantry[itemId]) {
        allPantry[itemId] = {
            ...allPantry[itemId],
            ...updates
        };
        setStorageItem(STORAGE_PANTRY_KEY, allPantry);
    }
}
// ---------------- GROCERY SERVICES ----------------
const STORAGE_GROCERY_KEY = 'mealai_local_grocery';
async function getUserGroceryItems(userId) {
    const allGrocery = getStorageItem(STORAGE_GROCERY_KEY, {});
    return Object.values(allGrocery).filter((g)=>g.userId === userId || g.userId === 'default');
}
async function saveGroceryItem(item) {
    const allGrocery = getStorageItem(STORAGE_GROCERY_KEY, {});
    allGrocery[item.id] = item;
    setStorageItem(STORAGE_GROCERY_KEY, allGrocery);
}
async function toggleGroceryChecked(itemId, checked) {
    const allGrocery = getStorageItem(STORAGE_GROCERY_KEY, {});
    if (allGrocery[itemId]) {
        allGrocery[itemId] = {
            ...allGrocery[itemId],
            checked,
            updatedAt: new Date().toISOString()
        };
        setStorageItem(STORAGE_GROCERY_KEY, allGrocery);
    }
}
async function deleteGroceryItem(itemId) {
    const allGrocery = getStorageItem(STORAGE_GROCERY_KEY, {});
    delete allGrocery[itemId];
    setStorageItem(STORAGE_GROCERY_KEY, allGrocery);
}
async function updateGroceryItemInFirestore(itemId, updates) {
    const allGrocery = getStorageItem(STORAGE_GROCERY_KEY, {});
    if (allGrocery[itemId]) {
        allGrocery[itemId] = {
            ...allGrocery[itemId],
            ...updates,
            updatedAt: new Date().toISOString()
        };
        setStorageItem(STORAGE_GROCERY_KEY, allGrocery);
    }
}
const STORAGE_FAVORITES_KEY = 'mealai_local_favorites';
async function getUserFavorites(userId) {
    const allFavorites = getStorageItem(STORAGE_FAVORITES_KEY, {});
    return Object.values(allFavorites).filter((f)=>f.userId === userId);
}
async function addFavoriteToFirestore(userId, recipe) {
    const favId = `${userId}_${recipe.id}`;
    const allFavorites = getStorageItem(STORAGE_FAVORITES_KEY, {});
    allFavorites[favId] = {
        id: favId,
        userId,
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        recipeImage: recipe.imageUrl,
        createdAt: new Date().toISOString()
    };
    setStorageItem(STORAGE_FAVORITES_KEY, allFavorites);
}
async function removeFavoriteFromFirestore(userId, recipeId) {
    const favId = `${userId}_${recipeId}`;
    const allFavorites = getStorageItem(STORAGE_FAVORITES_KEY, {});
    delete allFavorites[favId];
    setStorageItem(STORAGE_FAVORITES_KEY, allFavorites);
}
const STORAGE_AI_HISTORY_KEY = 'mealai_local_ai_history';
async function getUserAIHistory(userId) {
    const history = getStorageItem(STORAGE_AI_HISTORY_KEY, {});
    return Object.values(history).filter((h)=>h.userId === userId);
}
async function saveAIHistoryRecord(record) {
    const history = getStorageItem(STORAGE_AI_HISTORY_KEY, {});
    history[record.id] = record;
    setStorageItem(STORAGE_AI_HISTORY_KEY, history);
}
// ---------------- RECIPE & INGREDIENT CATALOG SERVICES ----------------
let catalogCache = null;
let catalogLoadingPromise = null;
let ingredientsCache = null;
async function loadFullCatalog() {
    if (catalogCache) return catalogCache;
    if (!catalogLoadingPromise) {
        catalogLoadingPromise = (async ()=>{
            try {
                const indianModule = await __turbopack_context__.A("[project]/src/data/indianRecipes.json.[json].cjs [app-client] (ecmascript, async loader)");
                const indianRaw = indianModule.default || indianModule;
                const normalizedIndian = indianRaw.map((r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeRecipeData"])(r));
                catalogCache = [
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$seedCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEED_RECIPES"],
                    ...normalizedIndian
                ];
            } catch (err) {
                console.warn('Could not load Indian recipes dataset:', err);
                catalogCache = [
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$seedCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEED_RECIPES"]
                ];
            }
            return catalogCache;
        })();
    }
    return catalogLoadingPromise;
}
async function getCatalogRecipes(filters) {
    const allRecipes = await loadFullCatalog();
    let results = [
        ...allRecipes
    ];
    if (filters) {
        if (filters.query && filters.query.trim()) {
            const qTokens = filters.query.toLowerCase().trim().split(/\s+/);
            results = results.filter((recipe)=>{
                const searchable = (recipe.searchableText || `${recipe.title} ${recipe.cuisine} ${recipe.description}`).toLowerCase();
                return qTokens.every((token)=>searchable.includes(token));
            });
        }
        if (filters.cuisine && filters.cuisine !== 'All') {
            const target = filters.cuisine.toLowerCase();
            results = results.filter((r)=>r.cuisine.toLowerCase() === target);
        }
        if (filters.mealType && filters.mealType !== 'All') {
            const target = filters.mealType.toLowerCase();
            results = results.filter((r)=>r.mealTypes && r.mealTypes.some((m)=>m.toLowerCase() === target) || r.mealType && r.mealType.toLowerCase() === target);
        }
        if (filters.dietaryTag && filters.dietaryTag !== 'All') {
            const target = filters.dietaryTag.toLowerCase();
            results = results.filter((r)=>r.dietaryTags && r.dietaryTags.some((d)=>d.toLowerCase() === target) || r.dietary && r.dietary.some((d)=>d.toLowerCase() === target));
        }
        if (filters.appliance && filters.appliance !== 'All') {
            const target = filters.appliance.toLowerCase();
            results = results.filter((r)=>r.applianceTags && r.applianceTags.some((a)=>a.toLowerCase().includes(target)) || r.appliances && r.appliances.some((a)=>a.toLowerCase().includes(target)));
        }
        if (filters.cookingMethod && filters.cookingMethod !== 'All') {
            const target = filters.cookingMethod.toLowerCase();
            results = results.filter((r)=>r.cookingMethods && r.cookingMethods.some((m)=>m.toLowerCase().includes(target)));
        }
        if (filters.difficulty && filters.difficulty !== 'All') {
            results = results.filter((r)=>r.difficulty.toLowerCase() === filters.difficulty?.toLowerCase());
        }
        if (filters.maxTotalTime) {
            results = results.filter((r)=>(r.totalTimeMinutes || r.totalTime) <= filters.maxTotalTime);
        }
        if (filters.maxCalories) {
            results = results.filter((r)=>r.calories <= filters.maxCalories);
        }
        if (filters.minProtein) {
            results = results.filter((r)=>(r.proteinGrams || r.protein) >= filters.minProtein);
        }
    }
    return results;
}
async function getCatalogRecipesPaginated(pageSize = 12, lastIndex) {
    const allRecipes = await getCatalogRecipes();
    const start = lastIndex ? lastIndex : 0;
    const items = allRecipes.slice(start, start + pageSize);
    const nextIndex = start + items.length;
    return {
        items,
        lastVisible: nextIndex < allRecipes.length ? nextIndex : null,
        hasMore: nextIndex < allRecipes.length
    };
}
async function getCatalogRecipeById(recipeId) {
    const all = await getCatalogRecipes();
    return all.find((r)=>r.id === recipeId) || null;
}
async function getCatalogRecipeBySlug(slug) {
    const all = await getCatalogRecipes();
    return all.find((r)=>r.slug === slug) || null;
}
async function getCatalogIngredients() {
    if (!ingredientsCache) {
        ingredientsCache = [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$seedCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEED_INGREDIENTS"]
        ];
    }
    return ingredientsCache;
}
async function getCatalogTaxonomies() {
    return {
        cuisines: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$seedCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEED_CUISINES"],
        mealTypes: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$seedCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEED_MEAL_TYPES"],
        dietaryTags: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$seedCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEED_DIETARY_TAGS"],
        appliances: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$seedCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEED_APPLIANCES"]
    };
}
async function seedCatalogDatabaseIfEmpty() {
    const all = await loadFullCatalog();
    ingredientsCache = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$seedCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEED_INGREDIENTS"]
    ];
    return {
        recipesCount: all.length,
        ingredientsCount: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$seedCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEED_INGREDIENTS"].length
    };
}
function calculateRecipePantryMatch(recipe, pantryItemNames) {
    const pantryNormalized = pantryItemNames.map((p)=>p.toLowerCase().trim()).filter(Boolean);
    const matched = [];
    const missing = [];
    recipe.ingredients.forEach((ing)=>{
        const ingName = ing.name.toLowerCase();
        const isFound = pantryNormalized.some((p)=>ingName.includes(p) || p.includes(ingName));
        if (isFound) {
            matched.push(ing.name);
        } else {
            missing.push(ing.name);
        }
    });
    const total = recipe.ingredients.length || 1;
    const matchPercentage = Math.round(matched.length / total * 100);
    return {
        matchedCount: matched.length,
        missingCount: missing.length,
        matchPercentage,
        matchedIngredients: matched,
        missingIngredients: missing
    };
}
async function uploadRecipeOrUserImage(_storagePath, file, _contentType) {
    if (file instanceof Blob) {
        return new Promise((resolve, reject)=>{
            const reader = new FileReader();
            reader.onload = ()=>resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
    return '';
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/types/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CatalogIngredientSchema",
    ()=>CatalogIngredientSchema,
    "DayPlanSchema",
    ()=>DayPlanSchema,
    "GeneratePlanRequestSchema",
    ()=>GeneratePlanRequestSchema,
    "GenerateRecipeRequestSchema",
    ()=>GenerateRecipeRequestSchema,
    "GroceryItemSchema",
    ()=>GroceryItemSchema,
    "PantryItemSchema",
    ()=>PantryItemSchema,
    "PlannedMealItemSchema",
    ()=>PlannedMealItemSchema,
    "RecipeIngredientSchema",
    ()=>RecipeIngredientSchema,
    "RecipeInstructionSchema",
    ()=>RecipeInstructionSchema,
    "RecipeSchema",
    ()=>RecipeSchema,
    "RecipeSubstitutionSchema",
    ()=>RecipeSubstitutionSchema,
    "TaxonomyItemSchema",
    ()=>TaxonomyItemSchema,
    "UserProfileSchema",
    ()=>UserProfileSchema,
    "WeeklyMealPlanSchema",
    ()=>WeeklyMealPlanSchema,
    "normalizeRecipeData",
    ()=>normalizeRecipeData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-client] (ecmascript) <export * as z>");
;
const RecipeIngredientSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    amount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    unit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().default(''),
    category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().default('Pantry'),
    note: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const RecipeInstructionSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    step: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive(),
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    instruction: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    timerMinutes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().nullable(),
    tip: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const RecipeSubstitutionSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    originalIngredient: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    substituteIngredient: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    ratio: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().default('1:1'),
    notes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const RecipeSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    userId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().default('system'),
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(200),
    slug: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(2000),
    cuisine: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(80),
    region: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    mealType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'breakfast',
        'lunch',
        'dinner',
        'snack',
        'dessert',
        'brunch',
        'appetizer',
        'drink'
    ]).optional().default('dinner'),
    mealTypes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional().default([]),
    difficulty: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'beginner',
        'easy',
        'intermediate',
        'advanced'
    ]).default('easy'),
    // Timing
    prepTime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().nonnegative().default(10),
    cookTime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().nonnegative().default(20),
    totalTime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().nonnegative().default(30),
    prepTimeMinutes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().nonnegative().optional(),
    cookTimeMinutes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().nonnegative().optional(),
    totalTimeMinutes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().nonnegative().optional(),
    servings: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().default(2),
    // Nutrition
    calories: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().nonnegative().default(450),
    protein: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nonnegative().default(25),
    carbs: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nonnegative().default(40),
    fat: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nonnegative().default(15),
    fiber: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nonnegative().optional(),
    proteinGrams: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nonnegative().optional(),
    carbohydratesGrams: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nonnegative().optional(),
    fatGrams: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nonnegative().optional(),
    fiberGrams: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nonnegative().optional(),
    // Taxonomy & Tags
    dietary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).default([]),
    dietaryTags: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional().default([]),
    allergens: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional().default([]),
    appliances: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).default([]),
    applianceTags: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional().default([]),
    cookingMethods: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional().default([]),
    tags: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional().default([]),
    // Content
    ingredients: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(RecipeIngredientSchema),
    instructions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(RecipeInstructionSchema),
    tips: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional().default([]),
    substitutions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(RecipeSubstitutionSchema).optional().default([]),
    imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().default(''),
    // Metadata & flags
    isFavorite: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false),
    isPublic: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(true),
    source: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default('catalog'),
    sourceType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'seed',
        'generated',
        'user'
    ]).optional().default('seed'),
    searchableText: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().default(''),
    matchedPantryCount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    missingIngredientsCount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
function normalizeRecipeData(data) {
    const prep = data.prepTimeMinutes ?? data.prepTime ?? 10;
    const cook = data.cookTimeMinutes ?? data.cookTime ?? 20;
    const total = data.totalTimeMinutes ?? data.totalTime ?? prep + cook;
    const prot = data.proteinGrams ?? data.protein ?? 20;
    const carb = data.carbohydratesGrams ?? data.carbs ?? 35;
    const fat = data.fatGrams ?? data.fat ?? 12;
    const fib = data.fiberGrams ?? data.fiber ?? 4;
    const mTypes = data.mealTypes && data.mealTypes.length > 0 ? data.mealTypes : [
        data.mealType || 'dinner'
    ];
    const dTags = data.dietaryTags && data.dietaryTags.length > 0 ? data.dietaryTags : data.dietary || [];
    const aTags = data.applianceTags && data.applianceTags.length > 0 ? data.applianceTags : data.appliances || [];
    const title = data.title || 'Untitled Recipe';
    const slug = data.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const searchable = data.searchableText || [
        title,
        data.description || '',
        data.cuisine || '',
        data.region || '',
        ...mTypes,
        ...dTags,
        ...aTags,
        ...data.cookingMethods || [],
        ...data.tags || [],
        ...data.ingredients?.map((i)=>i.name) || []
    ].join(' ').toLowerCase();
    return {
        id: data.id || `rec_${Math.random().toString(36).substring(2, 10)}`,
        userId: data.userId || 'system',
        title,
        slug,
        description: data.description || '',
        cuisine: data.cuisine || 'International',
        region: data.region || '',
        mealType: data.mealType || mTypes[0]?.toLowerCase() || 'dinner',
        mealTypes: mTypes,
        difficulty: data.difficulty || 'easy',
        prepTime: prep,
        cookTime: cook,
        totalTime: total,
        prepTimeMinutes: prep,
        cookTimeMinutes: cook,
        totalTimeMinutes: total,
        servings: data.servings || 2,
        calories: data.calories || 450,
        protein: prot,
        carbs: carb,
        fat: fat,
        fiber: fib,
        proteinGrams: prot,
        carbohydratesGrams: carb,
        fatGrams: fat,
        fiberGrams: fib,
        dietary: dTags,
        dietaryTags: dTags,
        allergens: data.allergens || [],
        appliances: aTags,
        applianceTags: aTags,
        cookingMethods: data.cookingMethods || [
            'Sauté'
        ],
        tags: data.tags || [],
        ingredients: data.ingredients || [],
        instructions: data.instructions || [],
        tips: data.tips || [],
        substitutions: data.substitutions || [],
        imageUrl: data.imageUrl || '',
        isFavorite: Boolean(data.isFavorite),
        isPublic: data.isPublic ?? true,
        source: data.source || 'catalog',
        sourceType: data.sourceType || 'seed',
        searchableText: searchable,
        matchedPantryCount: data.matchedPantryCount,
        missingIngredientsCount: data.missingIngredientsCount,
        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: data.updatedAt || new Date().toISOString()
    };
}
const CatalogIngredientSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    aliases: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).default([]),
    category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'produce',
        'protein',
        'dairy',
        'grain',
        'legume',
        'spice',
        'herb',
        'pantry',
        'oil',
        'sauce',
        'beverage',
        'other'
    ]),
    commonUnits: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).default([]),
    dietaryTags: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).default([]),
    allergens: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).default([]),
    substitutions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).default([]),
    searchableText: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default('')
});
const TaxonomyItemSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    slug: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().default(''),
    recipeCount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().nonnegative().optional(),
    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const UserProfileSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    uid: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(100),
    displayName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().default(''),
    phoneNumber: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    avatar: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().default(''),
    photoURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    provider: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().default('email'),
    dietaryPreferences: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).default([]),
    allergies: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).default([]),
    favoriteCuisines: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).default([]),
    skillLevel: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'beginner',
        'easy',
        'intermediate',
        'advanced'
    ]).default('easy'),
    householdSize: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().default(2),
    preferredAppliances: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).default([]),
    calorieGoal: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().default(2000),
    proteinGoal: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().default(100),
    dailyBudget: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nonnegative().default(25),
    createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const PantryItemSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    userId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(100),
    category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(50).default('Pantry Staples'),
    quantity: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(50).default('1'),
    unit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().default(''),
    expiryDate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const GroceryItemSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    userId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(100),
    category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(50).default('Produce'),
    quantity: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(50).default('1'),
    checked: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false),
    recipeTitle: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const PlannedMealItemSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    recipeId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    calories: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().default(0),
    protein: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().default(0),
    timeMinutes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().default(20),
    mealType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'breakfast',
        'lunch',
        'dinner',
        'snack'
    ]),
    cuisine: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    ingredientsSummary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional().default([])
});
const DayPlanSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    dayOfWeek: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    breakfast: PlannedMealItemSchema.optional(),
    lunch: PlannedMealItemSchema.optional(),
    dinner: PlannedMealItemSchema.optional(),
    snack: PlannedMealItemSchema.optional(),
    totalCalories: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().default(0),
    totalProtein: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().default(0)
});
const WeeklyMealPlanSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    userId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default('Weekly Plan'),
    weekStartDate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    days: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(), DayPlanSchema),
    targetCalories: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().default(2000),
    targetProtein: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().default(100),
    dietaryTags: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).default([]),
    createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const GenerateRecipeRequestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    ingredients: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).min(1, 'Please provide at least one ingredient'),
    cuisine: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().default('Any'),
    diet: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().default('No preference'),
    mealType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'breakfast',
        'lunch',
        'dinner',
        'snack',
        'dessert'
    ]).optional().default('dinner'),
    maxCookingTime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().default(45),
    difficulty: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'beginner',
        'easy',
        'intermediate',
        'advanced'
    ]).optional().default('easy'),
    appliances: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional().default([]),
    calories: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    protein: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    budget: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    householdSize: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().default(2),
    skillLevel: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    spiciness: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().default('Mild'),
    notes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    pantryItems: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional().default([])
});
const GeneratePlanRequestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    dietaryPreferences: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional().default([]),
    allergies: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional().default([]),
    favoriteCuisines: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional().default([]),
    calorieGoal: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().default(2000),
    proteinGoal: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().default(90),
    householdSize: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().default(2),
    skillLevel: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().default('easy'),
    appliances: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional().default([]),
    dailyBudget: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().default(30),
    pantryItems: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional().default([]),
    weekStartDate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_1cxg5tg._.js.map