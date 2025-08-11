import './main.css'
import { useState, useRef, useEffect} from 'react'
import ClaudeRecipe from './ClaudeRecipe'
import IngredientsList from './IngredientsList'
import { getRecipeFromMistral } from "../ai"

export default function Main(){
    const [ingredients, setIngredient] = useState([])
    const [recipeShown, setRecipeShown] = useState([])
    const RecipeSection = useRef(null)

    function handleOnSubmit(formData){
        const newIngredient =formData.get("ingredient")
        
        const isDuplicate = ingredients.some(
            item => item.toLowerCase() === newIngredient.toLowerCase()
            )

        if (newIngredient!=="" && !isDuplicate)
            setIngredient(prevIngredients => [...prevIngredients , newIngredient])
    }



    async function getrecipe(){
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        console.log(recipeMarkdown)
        setRecipeShown(recipeMarkdown)
    }

    const ingredientlist= ingredients.map(ingredient => <li key={ingredient}> {ingredient} </li>)

    console.log(RecipeSection)
    useEffect(() => {
        if(recipeShown != [] && RecipeSection.current != null ){
        console.log("recipe shown")
        RecipeSection.current.scrollIntoView({behavior: "smooth"})
        }
    }, [recipeShown])

    return <>
        <main>
            <form action={handleOnSubmit} className="add-ingredient-form"> 
                <input type="text" placeholder="e.g. Oregano" aria-label="Add ingredient" name="ingredient" />
                <button> Add ingredient</button>
            </form>
            <div className="main-layout-area">
                {ingredientlist.length > 0 && <IngredientsList ref={RecipeSection} list= {ingredientlist} getrecipe= {getrecipe} /> }
            </div>
            { <ClaudeRecipe recipe={recipeShown} /> }
        </main>
    </>
}


    /**
     * Problem:
     * We want to scroll the "Ready for a recipe?" div into view
     * ONLY AFTER the ClaudeRecipe section is rendered to the page 
     * (i.e. when `recipe` is not an empty string). How can we do that?
     */