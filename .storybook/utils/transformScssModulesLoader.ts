import { getLocalIdent } from './getLocalIdent'

// This old-fashioned business logic is used to find the *.modules.scss loaders in the very large storybook webpack
export const transformScssModulesLoader = (config: any) => {
    let newRules = config.module.rules
    let i = newRules.length

    while (i--) {
        // find the oneOf part of the rules array; I'm making the assumption that there will only be one.
        if (newRules[i].oneOf) {
            break
        }
    }

    let newOneOfArray = newRules[i].oneOf
    let j = newOneOfArray.length

    while (j--) {
        // Find the object that will get applied to filenames like 'MyComponent.module.scss'
        if (newOneOfArray[j]?.test?.test('MyComponent.module.scss')) {
            break
        }
    }

    let newUseArray = newOneOfArray[j].use
    let k = newUseArray.length

    while (k--) {
        // Find the css-loader among the 3 or 4 loaders that are common for style files.
        // Have to use optional chaining here because the dataTypes are not consistent
        if (newUseArray[k]?.loader?.indexOf('/node_modules/css-loader/') !== -1) {
            break
        }
    }

    newUseArray[k].options.modules.getLocalIdent = getLocalIdent
    
    // return the two array indeces that I will use to overwrite one particularly buried config
    // concerning the pre- and post-fixing of the selectors that will come out of the scss modules.
    // Also, return the new `use`, with the custom `getLocalIdent` func, that will overwrite the old one.
    return { i, j, newUseArray }
}
