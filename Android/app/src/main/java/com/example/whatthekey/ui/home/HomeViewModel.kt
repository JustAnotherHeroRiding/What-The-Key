package com.example.whatthekey.ui.home

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class HomeViewModel : ViewModel() {

    private val _text =
            MutableLiveData<String>().apply {
                value = "Hello World, this is the home fragment. Let's try to change is from VsCode"
            }
    val text: LiveData<String> = _text
}
