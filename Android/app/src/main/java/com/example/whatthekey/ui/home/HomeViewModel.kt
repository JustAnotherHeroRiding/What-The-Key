package com.example.whatthekey.ui.home

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.gson.Gson
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET
import retrofit2.http.Path
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import com.example.whatthekey.model.TrackData

class HomeViewModel : ViewModel() {

    interface SpotifyService {
        @GET("spotify/track/{id}")
        suspend fun fetchTrack(@Path("id") trackId: String): Response<TrackData>
    }

    private val _text = MutableLiveData<String>()

    val text: LiveData<String> = _text

    fun fetchTrackInfo() {
        Log.d("TrackInfo", "Function called")
        viewModelScope.launch(Dispatchers.IO) {
            try {
                // This will log all http request notes
                // This helped me finally see the json response, but it logs too much
               /* val logging = HttpLoggingInterceptor().apply {
                    setLevel(HttpLoggingInterceptor.Level.BODY)
                }

                val client = OkHttpClient.Builder()
                    .addInterceptor(logging)
                    .build()
*/
                val retrofit = Retrofit.Builder()
                    .baseUrl("https://what-the-key.vercel.app/api/")
                    .addConverterFactory(GsonConverterFactory.create())
                    //.client(client) Add this back to see the http logs again
                    .build()

                val spotifyService = retrofit.create(SpotifyService::class.java)
                val response = spotifyService.fetchTrack("1kHPOtD1fo3kWOgcs0oisd")

                withContext(Dispatchers.Main) {
                    if (response.isSuccessful) {
                        // On success, switch to the main thread to update UI
                        val track = response.body()
                        _text.value = track?.let { Gson().toJson(it) } // Update LiveData

                        // Print the successful response
                        Log.d("TrackInfo", "Success: ${Gson().toJson(track)}")
                    } else {
                        // Handle the case where the response is not successful
                        _text.value = "Unsuccessful response"
                        Log.d("TrackInfo", "Response is unsuccessful")
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    _text.value = "Error fetching track data"
                    Log.d("TrackInfoError", "Exception: ${e.message}")
                }
                e.printStackTrace()
            }
        }
    }

}
