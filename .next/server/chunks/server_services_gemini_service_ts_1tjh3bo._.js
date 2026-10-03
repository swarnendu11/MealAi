module.exports=[86381,e=>{"use strict";var t=e.i(26193),i=e.i(3344);let a=["https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1000&q=80"],n=["https://images.unsplash.com/photo-1621996346565-e3d5d6281724?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1000&q=80"],r=["https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80"],s=["https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=1000&q=80"],o=["https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=1000&q=80"],l=["https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1000&q=80"],c=["https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1000&q=80"],d=["https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1000&q=80"],u=["https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1000&q=80"],p=["https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1000&q=80"],m=["https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1505253758473-96b46d5f6983?auto=format&fit=crop&w=1000&q=80"],g=["https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1000&q=80"];function h(e,t,i,f=[]){let y=`${e} ${t} ${i} ${f.join(" ")}`.toLowerCase();return y.includes("curry")||y.includes("tikka")||y.includes("biryani")||y.includes("indian")?d[Math.floor(Math.random()*d.length)]:y.includes("taco")||y.includes("fajita")||y.includes("burrito")||y.includes("mexican")||y.includes("salsa")?u[Math.floor(Math.random()*u.length)]:y.includes("ramen")||y.includes("noodle")||y.includes("stir fry")||y.includes("asian")||y.includes("teriyaki")?p[Math.floor(Math.random()*p.length)]:y.includes("pasta")||y.includes("spaghetti")||y.includes("lasagna")||y.includes("penne")||y.includes("italian")?n[Math.floor(Math.random()*n.length)]:"breakfast"===i||y.includes("pancake")||y.includes("egg")||y.includes("toast")||y.includes("oat")?c[Math.floor(Math.random()*c.length)]:y.includes("chicken")||y.includes("poultry")?a[Math.floor(Math.random()*a.length)]:y.includes("salmon")||y.includes("shrimp")||y.includes("fish")||y.includes("seafood")||y.includes("tuna")?l[Math.floor(Math.random()*l.length)]:y.includes("salad")||y.includes("bowl")||y.includes("greens")?r[Math.floor(Math.random()*r.length)]:y.includes("soup")||y.includes("stew")||y.includes("chili")||y.includes("broth")?o[Math.floor(Math.random()*o.length)]:y.includes("rice")||y.includes("risotto")?s[Math.floor(Math.random()*s.length)]:y.includes("mediterranean")||y.includes("greek")?m[Math.floor(Math.random()*m.length)]:g[Math.floor(Math.random()*g.length)]}class f{static generateFallbackRecipe(e,t="guest_user"){let a=e.ingredients[0]||"Herb Garden Vegetables",n=e.cuisine&&"Any"!==e.cuisine?e.cuisine:"Mediterranean",r=e.mealType||"dinner",s=`${n} Style ${a} Skillet`,o=Math.min(e.maxCookingTime-10,20),l="rec_fb_"+Math.random().toString(36).substring(2,10),c=h(s,n,r,e.ingredients);return(0,i.normalizeRecipeData)({id:l,userId:t,title:s,description:`A fragrant, golden ${n.toLowerCase()} skillet dish featuring tender ${a.toLowerCase()} simmered with aromatic garlic, olive oil, and herbs.`,cuisine:n,mealType:r,dietary:e.diet&&"No preference"!==e.diet?[e.diet]:["High-Protein","Balanced"],prepTime:10,cookTime:o,totalTime:10+o,servings:e.householdSize||2,calories:e.calories||480,protein:e.protein||34,carbs:38,fat:16,fiber:6,difficulty:e.difficulty||"easy",appliances:e.appliances.length?e.appliances:["Stovetop"],ingredients:[{name:a,amount:"400",unit:"g",category:"Produce",note:"freshly prepared"},...e.ingredients.slice(1).map(e=>({name:e,amount:"1",unit:"cup",category:"Produce",note:"chopped"})),{name:"Extra Virgin Olive Oil",amount:"2",unit:"tbsp",category:"Pantry",note:"for searing"},{name:"Garlic",amount:"3",unit:"cloves",category:"Produce",note:"minced"},{name:"Sea Salt & Cracked Black Pepper",amount:"1/2",unit:"tsp",category:"Pantry",note:"to taste"}],instructions:[{step:1,title:"Prep Ingredients",instruction:`Rinse and dice ${a} into uniform pieces. Mince garlic and gather spices.`,timerMinutes:null,tip:"Uniform cuts ensure even cooking throughout."},{step:2,title:"Sear & Sauté",instruction:`Heat olive oil in a heavy skillet over medium-high heat. Add garlic and ${a}, stirring for 6-8 minutes until golden and fragrant.`,timerMinutes:8,tip:"Listen for a gentle sizzle to know the pan is at proper temperature."},{step:3,title:"Simmer and Finish",instruction:"Lower heat to medium-low, season generously with salt and pepper, and finish with a squeeze of fresh lemon juice or herbs.",timerMinutes:5,tip:"Let rest for 2 minutes before serving."}],tips:["Serve with warm crusty bread, steamed grains, or a fresh side salad.","Store leftovers in an airtight container for up to 3 days."],imageUrl:c,isFavorite:!1,source:"ai_generated",matchedPantryCount:e.ingredients.length,missingIngredientsCount:2,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()})}static generateFallbackMealPlan(e,t="guest_user"){let i="plan_fb_"+Math.random().toString(36).substring(2,10),a={};return["monday","tuesday","wednesday","thursday","friday","saturday","sunday"].forEach((t,i)=>{let n=t.charAt(0).toUpperCase()+t.slice(1);a[t]={dayOfWeek:n,date:e.weekStartDate,breakfast:{title:`Artisanal Morning Scramble & Avocado Toast (${n})`,description:"Fluffy organic eggs with avocado on toasted sourdough.",calories:380,protein:24,timeMinutes:10,mealType:"breakfast",cuisine:"American",ingredientsSummary:["Eggs","Sourdough bread","Avocado","Olive oil"],imageUrl:h("Eggs breakfast","American","breakfast",[])},lunch:{title:`Mediterranean Harvest Grain Bowl (${n})`,description:"Quinoa with roasted vegetables, chickpeas, and lemon tahini drizzle.",calories:520,protein:28,timeMinutes:15,mealType:"lunch",cuisine:"Mediterranean",ingredientsSummary:["Quinoa","Chickpeas","Cucumber","Tahini","Lemon"],imageUrl:h("Mediterranean bowl","Mediterranean","lunch",[])},dinner:{title:`Pan-Seared Lemon Herb Salmon with Greens (${n})`,description:"Golden seared salmon over sautéed garlic greens and roasted potatoes.",calories:610,protein:42,timeMinutes:25,mealType:"dinner",cuisine:"Mediterranean",ingredientsSummary:["Salmon","Baby potatoes","Asparagus","Garlic","Lemon"],imageUrl:h("Salmon dinner","Mediterranean","dinner",[])},snack:{title:"Greek Yogurt with Toasted Almonds & Honey",description:"Creamy high-protein snack with gentle sweetness.",calories:190,protein:15,timeMinutes:2,mealType:"snack",cuisine:"Greek",ingredientsSummary:["Greek yogurt","Almonds","Honey"],imageUrl:h("Yogurt snack","American","snack",[])},totalCalories:1700,totalProtein:109}}),{id:i,userId:t,title:"7-Day Balanced Culinary Plan",weekStartDate:e.weekStartDate,days:a,targetCalories:e.calorieGoal||2e3,targetProtein:e.proteinGoal||90,dietaryTags:e.dietaryPreferences||[],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}}}e.s(["GeminiService",0,class{static parseJsonSafely(e){if(!e)return{};let t=e.trim();return t.startsWith("```json")?t=t.substring(7):t.startsWith("```")&&(t=t.substring(3)),t.endsWith("```")&&(t=t.substring(0,t.length-3)),JSON.parse(t=t.trim())}static async generateRecipe(e,a="guest_user"){let n=(0,t.getGeminiClient)();if(!n)return console.warn("[GeminiService] No GEMINI_API_KEY detected. Using high-fidelity FallbackService."),f.generateFallbackRecipe(e,a);let r=`
You are MealAI's world-class master chef and nutritionist.
The user wants to generate a complete, mouthwatering, practical recipe matching these specific criteria:

Available / Requested Ingredients: ${e.ingredients.join(", ")}
${e.pantryItems.length?`Additional User Pantry Items available if helpful: ${e.pantryItems.join(", ")}`:""}
Cuisine Preference: ${e.cuisine||"Any"}
Dietary Preference: ${e.diet||"No preference"}
Meal Type: ${e.mealType}
Maximum Cooking Time: ${e.maxCookingTime} minutes
Difficulty Target: ${e.difficulty}
Kitchen Appliances Available: ${e.appliances.length?e.appliances.join(", "):"Standard stovetop & oven"}
Spiciness Level: ${e.spiciness||"Mild"}
Target Servings: ${e.householdSize||2}
Target Calories per serving: ${e.calories?`${e.calories} kcal`:"Sensible balanced"}
Target Protein per serving: ${e.protein?`${e.protein}g`:"Sensible balanced"}
Additional Notes / Requests: ${e.notes||"None"}

RULES:
1. Prioritize the user's primary ingredients. You may include common household staples (oil, salt, pepper, garlic, butter, water).
2. The total time MUST NOT exceed ${e.maxCookingTime} minutes.
3. If an appliance like "Air Fryer" or "Instant Pot" was chosen, tailor the instructions to utilize it prominently.
4. Each instruction step must have a clear description. If a step involves waiting or cooking for a set time, include "timerMinutes" as a positive integer.
5. Return ONLY a valid JSON object matching the exact structure below.

Return this JSON format:
{
  "title": "Dish name",
  "description": "Appetizing 2-3 sentence culinary summary describing flavors, texture, and aroma.",
  "cuisine": "e.g. Italian, Indian, Mediterranean, American, etc.",
  "mealType": "breakfast" | "lunch" | "dinner" | "snack" | "dessert",
  "dietary": ["High-Protein", "Gluten-Free", etc.],
  "prepTime": 10,
  "cookTime": 15,
  "totalTime": 25,
  "servings": 2,
  "calories": 480,
  "protein": 34,
  "carbs": 42,
  "fat": 16,
  "fiber": 6,
  "difficulty": "beginner" | "easy" | "intermediate" | "advanced",
  "appliances": ["Air Fryer"],
  "ingredients": [
    {
      "name": "Chicken Breast",
      "amount": "2",
      "unit": "medium breasts (approx 400g)",
      "category": "Meat & Seafood",
      "note": "diced into bite-sized cubes"
    }
  ],
  "instructions": [
    {
      "step": 1,
      "title": "Season and Prep",
      "instruction": "Toss diced chicken with olive oil, paprika, garlic powder, salt, and black pepper until evenly coated.",
      "timerMinutes": null,
      "tip": "Pat meat dry with paper towel first for crispier texture."
    }
  ],
  "tips": [
    "Serve alongside steamed basmati rice or a crisp green salad."
  ]
}
`;try{let s=await n.models.generateContent({model:t.GEMINI_MODEL,contents:r,config:{responseMimeType:"application/json",temperature:.7}}),o=this.parseJsonSafely(s.text||"{}"),l=e.ingredients.map(e=>e.toLowerCase().trim()),c=0,d=0;Array.isArray(o.ingredients)&&o.ingredients.forEach(e=>{let t=(e.name||"").toLowerCase();l.some(e=>t.includes(e)||e.includes(t))?c++:d++});let u="rec_"+Math.random().toString(36).substring(2,11),p=h(o.title||"",o.cuisine||"",o.mealType||e.mealType,e.ingredients),m={id:u,userId:a,title:o.title||"Personalized AI Creation",description:o.description||"A delicious dish crafted specifically for your kitchen.",cuisine:o.cuisine||e.cuisine||"Fusion",mealType:o.mealType||e.mealType||"dinner",dietary:Array.isArray(o.dietary)?o.dietary:[],prepTime:Number(o.prepTime)||10,cookTime:Number(o.cookTime)||15,totalTime:Number(o.totalTime)||(Number(o.prepTime)||10)+(Number(o.cookTime)||15),servings:Number(o.servings)||e.householdSize||2,calories:Math.round(Number(o.calories)||450),protein:Math.round(Number(o.protein)||25),carbs:Math.round(Number(o.carbs)||35),fat:Math.round(Number(o.fat)||15),fiber:Math.round(Number(o.fiber)||4),difficulty:o.difficulty||e.difficulty||"easy",appliances:Array.isArray(o.appliances)?o.appliances:e.appliances,ingredients:Array.isArray(o.ingredients)?o.ingredients:[],instructions:Array.isArray(o.instructions)?o.instructions:[],tips:Array.isArray(o.tips)?o.tips:[],imageUrl:p,isFavorite:!1,source:"ai_generated",matchedPantryCount:c,missingIngredientsCount:d,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};return i.RecipeSchema.parse(m)}catch(t){return console.error("[GeminiService] Error generating recipe:",t),f.generateFallbackRecipe(e,a)}}static async modifyRecipe(e,a){let n=(0,t.getGeminiClient)();if(!n)return{...e,title:`${e.title} (${a})`,tips:[...e.tips,`Modified according to preference: ${a}`],updatedAt:new Date().toISOString()};let r=`
You are MealAI's master culinary recipe adaptor.
The user wants to adapt the following existing recipe:
Title: "${e.title}"
Current Ingredients: ${e.ingredients.map(e=>`${e.amount} ${e.unit} ${e.name}`).join(", ")}
Current Instructions: ${e.instructions.map(e=>e.instruction).join(" ")}

Modification Request: "${a}"

Tasks:
1. Update ingredients and quantities accordingly (e.g. make it spicy, cut calories in half, make it vegan/vegetarian, swap for air fryer, keto adaptation, etc.).
2. Update cooking steps, timings, temperatures, and tips to reflect the modification accurately.
3. Recalculate estimated nutritional values (calories, protein, carbs, fat, fiber).
4. Return ONLY a valid JSON object matching the full recipe schema format.
`;try{let a=await n.models.generateContent({model:t.GEMINI_MODEL,contents:r,config:{responseMimeType:"application/json",temperature:.6}}),s=this.parseJsonSafely(a.text||"{}"),o={...e,...s,id:e.id,imageUrl:e.imageUrl,updatedAt:new Date().toISOString()};return i.RecipeSchema.parse(o)}catch(t){return console.error("[GeminiService] Error modifying recipe:",t),{...e,title:`${e.title} (${a})`,tips:[...e.tips,`Modified for: ${a}`],updatedAt:new Date().toISOString()}}}static async generateWeeklyPlan(e,a="guest_user"){let n=(0,t.getGeminiClient)();if(!n)return console.warn("[GeminiService] No GEMINI_API_KEY. Using FallbackService meal plan."),f.generateFallbackMealPlan(e,a);let r=`
You are MealAI's nutrition architect. Generate a cohesive, mouthwatering 7-day weekly meal plan.
User Profile & Constraints:
- Dietary Preferences: ${e.dietaryPreferences.length?e.dietaryPreferences.join(", "):"None"}
- Allergies / Dislikes: ${e.allergies.length?e.allergies.join(", "):"None"}
- Favorite Cuisines: ${e.favoriteCuisines.length?e.favoriteCuisines.join(", "):"Diverse"}
- Daily Calorie Target: Approx ${e.calorieGoal} kcal
- Daily Protein Target: Approx ${e.proteinGoal}g protein
- Household Size: ${e.householdSize} people
- Cooking Skill Level: ${e.skillLevel}
- Available Appliances: ${e.appliances.length?e.appliances.join(", "):"Standard kitchen"}
- Available Pantry Ingredients: ${e.pantryItems.slice(0,10).join(", ")||"Standard pantry"}
- Week Start Date: ${e.weekStartDate}

Generate an organized plan for each of the 7 days:
Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.

For each day, provide:
- Breakfast, Lunch, Dinner, Snack with calories, protein (g), and timeMinutes.
Return ONLY valid JSON matching this schema:
{
  "title": "7-Day Personalized Meal Plan",
  "days": {
    "monday": {
      "dayOfWeek": "Monday",
      "date": "${e.weekStartDate}",
      "breakfast": { "title": "Dish", "description": "Desc", "calories": 400, "protein": 25, "timeMinutes": 10, "mealType": "breakfast", "cuisine": "American", "ingredientsSummary": ["eggs"] },
      "lunch": { "title": "Dish", "description": "Desc", "calories": 500, "protein": 35, "timeMinutes": 15, "mealType": "lunch", "cuisine": "Mediterranean", "ingredientsSummary": ["chicken"] },
      "dinner": { "title": "Dish", "description": "Desc", "calories": 600, "protein": 40, "timeMinutes": 25, "mealType": "dinner", "cuisine": "Italian", "ingredientsSummary": ["salmon"] },
      "snack": { "title": "Dish", "description": "Desc", "calories": 200, "protein": 10, "timeMinutes": 5, "mealType": "snack", "cuisine": "American", "ingredientsSummary": ["apple"] },
      "totalCalories": 1700,
      "totalProtein": 110
    }
  }
}
`;try{let s=await n.models.generateContent({model:t.GEMINI_MODEL,contents:r,config:{responseMimeType:"application/json",temperature:.7}}),o=this.parseJsonSafely(s.text||"{}"),l="plan_"+Math.random().toString(36).substring(2,11),c=o.days||{};Object.keys(c).forEach(e=>{let t=c[e];["breakfast","lunch","dinner","snack"].forEach(e=>{t[e]&&(t[e].imageUrl=h(t[e].title||"",t[e].cuisine||"",e,t[e].ingredientsSummary||[]))});let i=(t.breakfast?.calories||0)+(t.lunch?.calories||0)+(t.dinner?.calories||0)+(t.snack?.calories||0),a=(t.breakfast?.protein||0)+(t.lunch?.protein||0)+(t.dinner?.protein||0)+(t.snack?.protein||0);t.totalCalories=i,t.totalProtein=a});let d={id:l,userId:a,title:o.title||"7-Day Personalized Meal Plan",weekStartDate:e.weekStartDate,days:c,targetCalories:e.calorieGoal||2e3,targetProtein:e.proteinGoal||90,dietaryTags:e.dietaryPreferences,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};return i.WeeklyMealPlanSchema.parse(d)}catch(t){return console.error("[GeminiService] Error generating meal plan:",t),f.generateFallbackMealPlan(e,a)}}static async analyzeIngredientsImage(e,i="image/jpeg"){let a=(0,t.getGeminiClient)();if(!a)return{detectedIngredients:[{name:"Fresh Produce",category:"Produce",estimatedQuantity:"Variety",freshness:"fresh"},{name:"Pantry Staples",category:"Pantry",estimatedQuantity:"Assorted",freshness:"good"}],culinarySuggestions:["Fresh Garden Stir Fry","Wholesome Medley Bowl"]};let n=e.replace(/^data:image\/[a-zA-Z0-9.+]+;base64,/,""),r={text:`
Examine this photo. You are MealAI's computer vision food expert.
Detect all visible kitchen ingredients, fresh produce, vegetables, meats, dairy, eggs, condiments, grains, canned items, or herbs in this photo.
Return ONLY a valid JSON object in this format:
{
  "detectedIngredients": [
    {
      "name": "Tomatoes",
      "category": "Produce",
      "estimatedQuantity": "4 medium",
      "freshness": "fresh"
    }
  ],
  "culinarySuggestions": [
    "Shakshuka with eggs and tomatoes"
  ]
}
`},s=await a.models.generateContent({model:t.GEMINI_MODEL,contents:{parts:[{inlineData:{mimeType:i,data:n}},r]},config:{responseMimeType:"application/json"}});return this.parseJsonSafely(s.text||"{}")}static async substituteIngredient(e,i,a){let n=(0,t.getGeminiClient)();if(!n)return{ingredient:e,substitutions:[{name:`Standard 1:1 culinary alternative for ${e}`,ratio:"1:1 ratio",flavorImpact:"Preserves the core texture and balance",bestFor:"cooking and baking"}],chefNote:"Season gently to taste when swapping staples."};let r=`
The user is cooking ${i?`"${i}"`:"a dish"} and is missing or cannot eat "${e}".
${a?`Dietary restriction: ${a}`:""}
Provide 3 practical culinary substitutions with exact ratios, how it affects flavor/texture, and tips.

Return JSON:
{
  "ingredient": "${e}",
  "substitutions": [
    {
      "name": "Alternative ingredient",
      "ratio": "e.g. 1:1 replacement",
      "flavorImpact": "Description of taste change",
      "bestFor": "baking, saut\xe9ing, sauces, etc."
    }
  ],
  "chefNote": "Brief culinary wisdom"
}
`,s=await n.models.generateContent({model:t.GEMINI_MODEL,contents:r,config:{responseMimeType:"application/json"}});return this.parseJsonSafely(s.text||"{}")}static async surpriseMe(e="balanced",t="guest_user"){let i=["Italian","Mexican","Japanese","Thai","Indian","Mediterranean","French","Korean","Spanish"],a=i[Math.floor(Math.random()*i.length)];return this.generateRecipe({ingredients:["Chef Choice Fresh Ingredients"],pantryItems:["Olive Oil","Garlic","Sea Salt"],cuisine:a,diet:e,mealType:"dinner",maxCookingTime:30,difficulty:"easy",appliances:["Stovetop"],householdSize:2,spiciness:"Mild"},t)}static async regenerateMeal(e){let i=(0,t.getGeminiClient)(),a=e.calorieGoal?Math.round(e.calorieGoal/3):500,n=e.proteinGoal?Math.round(e.proteinGoal/3):30;if(!i){let t=`Chef's Fresh ${e.dayOfWeek} ${e.mealType}`;return{title:t,description:"A vibrant alternative meal crafted to hit your nutritional goals.",calories:a,protein:n,timeMinutes:20,mealType:e.mealType,cuisine:e.cuisines?.[0]||"Mediterranean",ingredientsSummary:["Fresh Vegetables","Olive Oil","Protein of choice","Herbs"],imageUrl:h(t,"Mediterranean",e.mealType,[]),recipeId:"rec_gen_"+Math.random().toString(36).substring(2,9)}}let r=`
You are MealAI's meal planning expert.
The user wants to replace/regenerate their ${e.dayOfWeek} ${e.mealType}.
Current dish to replace: "${e.currentTitle||"Current meal"}"
Requirements:
- Meal Type: ${e.mealType}
- Target Calories: ~${a} kcal
- Target Protein: ~${n}g
- Dietary Preferences: ${Array.isArray(e.dietaryPreferences)?e.dietaryPreferences.join(", "):"None"}
- Allergies / Dislikes: ${Array.isArray(e.allergies)?e.allergies.join(", "):"None"}
- Preferred Cuisines: ${Array.isArray(e.cuisines)?e.cuisines.join(", "):"Diverse"}
- Available Pantry Items: ${Array.isArray(e.pantryItems)?e.pantryItems.slice(0,10).join(", "):"None"}

Generate a completely different, fresh, delicious meal to replace it.
Return ONLY valid JSON:
{
  "title": "Dish name",
  "description": "Appetizing 1-2 sentence description",
  "calories": ${a},
  "protein": ${n},
  "timeMinutes": 20,
  "mealType": "${e.mealType}",
  "cuisine": "e.g. Mediterranean, Mexican, Asian, etc.",
  "ingredientsSummary": ["Ingredient 1", "Ingredient 2", "Ingredient 3", "Ingredient 4"]
}
`,s=await i.models.generateContent({model:t.GEMINI_MODEL,contents:r,config:{responseMimeType:"application/json"}}),o=this.parseJsonSafely(s.text||"{}"),l=h(o.title||"",o.cuisine||"Fusion",e.mealType,o.ingredientsSummary||[]);return{...o,recipeId:"rec_gen_"+Math.random().toString(36).substring(2,9),imageUrl:l}}static async consolidateGroceries(e,i=[]){let a=(0,t.getGeminiClient)();if(!a||0===e.length)return e.slice(0,15).map(e=>({name:e,quantity:"As needed",category:"Produce"}));let n=`
You are MealAI's smart grocery aggregator.
Combine duplicates and categorize each ingredient for a shopping trip:
${e.join("\n")}

${i.length>0?`Already in Pantry:
${i.join(", ")}`:""}

Categories allowed: "Produce", "Protein", "Dairy", "Grains", "Pantry", "Frozen", "Other".
Return JSON:
{
  "consolidatedItems": [
    { "name": "Item Name", "quantity": "e.g. 500g", "category": "Produce" }
  ]
}
`,r=await a.models.generateContent({model:t.GEMINI_MODEL,contents:n,config:{responseMimeType:"application/json"}});return this.parseJsonSafely(r.text||"{}").consolidatedItems||[]}static async askCookingAssistant(e,i,a){let n=(0,t.getGeminiClient)();if(!n)return"For best results, maintain gentle heat and check for visual cues like golden searing.";let r="number"==typeof a&&e.instructions[a]?e.instructions[a]:null,s=`
You are MealAI's live cooking assistant speaking to a home cook currently preparing: "${e.title}".
Ingredients: ${e.ingredients.map(e=>`${e.amount} ${e.unit} ${e.name}`).join(", ")}
${r?`User is on Step ${r.step}: "${r.title}" - ${r.instruction}`:""}

Home Cook's Question: "${i}"
Provide direct, encouraging, sensory advice in 2-3 sentences.
`,o=await n.models.generateContent({model:t.GEMINI_MODEL,contents:s,config:{temperature:.5}});return o.text?.trim()||"Keep your temperature moderate and test with a fork for tenderness."}}],86381)}];

//# sourceMappingURL=server_services_gemini_service_ts_1tjh3bo._.js.map