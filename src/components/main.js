import './main.css'
import { useState} from 'react'
import ClaudeRecipe from './ClaudeRecipe'
import IngredientsList from './IngredientsList'
import { getRecipeFromChefClaude, getRecipeFromMistral } from "../ai"

export default function Main(){
    const [ingredients, setIngredient] = useState([])
    const [recipeShown, setRecipeShown] = useState([])

    function handleOnSubmit(formData){
        const newIngredient =formData.get("ingredient")
        
        const isDuplicate = ingredients.some(
            item => item.toLowerCase() === newIngredient.toLowerCase()
            )

        if (newIngredient!=="" && !isDuplicate)
            setIngredient(prevIngredients => [...prevIngredients , newIngredient])
    }

    async function getrecipe(){
        // setRecipeShown(prevState => !prevState)
        // console.log(recipeShown)
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        console.log(recipeMarkdown)
        setRecipeShown(recipeMarkdown)
    }

    const ingredientlist= ingredients.map(ingredient => <li key={ingredient}> {ingredient} </li>)

    return <>
        <main>
            <form action={handleOnSubmit} className="add-ingredient-form"> 
                <input type="text" placeholder="e.g. Oregano" aria-label="Add ingredient" name="ingredient" />
                <button> Add ingredient</button>
            </form>
            <div className="main-layout-area">
                {ingredientlist.length > 0 && <IngredientsList list= {ingredientlist} getrecipe= {getrecipe} /> }
            </div>
            { <ClaudeRecipe recipe={recipeShown}/> }
        </main>
    </>
}





    /**
     * Challenge: clean up our code!
     * Let's make a couple new components to make things a
     * little cleaner. (Notice: I'm not suggesting what we
     * have now is bad or wrong. I'm mostly finding an excuse
     * to get in some hands-on practice 🙂)
     * 
     * 1. Move the entire recipe <section> into its own
     *    ClaudeRecipe component
     * 2. Move the list of ingredients <section> into its
     *    own IngredientsList component.
     * 
     * While you're considering how to structure things, consider
     * where state is, think about if it makes sense or not to
     * move it somewhere else, how you'll communicate between
     * the parent/child components, etc.
     * 
     * The app should function as it currently does when you're
     * done, so there will likely be some extra work to be done
     * beyond what I've listed above.
     */
