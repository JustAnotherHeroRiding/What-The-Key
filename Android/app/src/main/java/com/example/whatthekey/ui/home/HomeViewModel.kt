package com.example.whatthekey.ui.home

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

class HomeViewModel : ViewModel() {

    data class Track(
            val id: String,
            val name: String,
    // Add other fields as needed
    )

    interface SpotifyService {
        @GET("spotify/track/{id}")
        suspend fun fetchTrack(@Path("id") trackId: String): Response<Track>
    }

    private val _text = MutableLiveData<String>()

    val text: LiveData<String> = _text

    fun fetchTrackInfo() {
        viewModelScope.launch(Dispatchers.IO) {
            try {
                val retrofit =
                        Retrofit.Builder()
                                .baseUrl("https://what-the-key.vercel.app/api/") 
                                .addConverterFactory(GsonConverterFactory.create())
                                .build()

                val spotifyService = retrofit.create(SpotifyService::class.java)
                val response = spotifyService.fetchTrack("1kHPOtD1fo3kWOgcs0oisd")

                if (response.isSuccessful) {
                    // On success, switch to the main thread to update UI
                    withContext(Dispatchers.Main) {
                        val track = response.body()
                        _text.value = track?.let { Gson().toJson(it) } // Update LiveData
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) { _text.value = "Error fetching track data" }
                e.printStackTrace()
            }
        }
    }
}
