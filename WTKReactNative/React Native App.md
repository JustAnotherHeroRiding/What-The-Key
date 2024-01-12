# [Api Docs](https://what-the-key.vercel.app/docs)
# [Icons](https://icons.expo.fyi/Index)


## Multi platform App

Instead of using Kotlin to create a native android app, let's use React native to create a multi platform app.
We need to implement the same 4 pages with full feature parity

## Navigation
- Navigate between the pages, using the same logos and look from the website #DONE 

## Home page
- Get random track #DONE 
- Debounce the input and only make a request after 300 ms have passed of no changes to the query #DONE 
##### [Custom debounce](https://sugandsingh5566.medium.com/mastering-throttle-and-debounce-functions-in-react-native-with-javascript-a03965240829) or we will use lodash. For now i am thinking using lodash
- Search spotify tracks #DONE 
- Style the search results
- Add the close single result button inside of the component itself #DONE 
- Add tracks to library from the search results #DONE 
- Search results will be styled similar to spotify, small rows with small images of containers #DONE  
- Add track option from the random track #DONE 

## Services
To reduce code repetition, let's store all of the api calls into a single service 
- Create a track service #DONE 
- Move the add to library function to the service #DONE 
- Inject the service in all components where we do track related calls(Track, SearchResultTrack, RandomTrack)

## React query
Implement react query to simplify all the data management
- The add track mutation is throwing a type error despite the fetch call being correctly type

## Zustand
- If react query is not enough, use zustand

##### Image Distortion
- Currently the left and right sides of the image are being distorted in the result card due to the image being stretched. Make sure that the image does not lose quality and is preserved

## Track component
- Create a separate track component that will be used in the library and bin #DONE 
- equip it with all options like delete/restore, permanent delete, show/add tabs and open the spotify link
- Manage context menu boolean in each component separately #DONE 
## Library
- See all tracks in the user's library #DONE 
- Flatlist to render the tracks #DONE 
- Pull to refresh to make another request #DONE 
- Infinite scroll for tracks
- Display tabs button
- Delete the tracks to send them to the recycle bin


## Deleted 
- See all tracks added to the recycle bin #DONE 
- Display tabs button
- Restore tracks to library or delete them permanently

## Drag and drop
- Allow users to reorder the tracks in the library/Bin

## Adding tracks and cache
- Adding a track works but there was a bug where no toast was displayed yet the track was added #Bug
- Also the context menu should also close #DONE 
- The cache needs to be invalidated, it seems to be autocached

## Auth
- Log in and manage the library of tracks using the same database as the website #DONE 
- Use the supabase tutorial to set up the auth flow [Link](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native) #DONE 
- Do an auth check on the auth screen, and then render the profile or sign in component depending on the session #DONE 
- Set up the profile picture and profile views #DONE 
- Image uploading #DONE 
- The profile picture changes on the client, but it does not get updated in the db #DONE 
##### In the sql functions i did not add my url and service key when copying them from the guide. After that i had single and double quotes around the url. Uploading correctly updates the profile now.
- Implement deep linking for verifying the email [Deep linking Guide](https://supabase.com/docs/guides/auth/native-mobile-deep-linking?platform=react-native)
