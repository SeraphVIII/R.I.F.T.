package co.tryterra.terrartandroiddemo

import android.annotation.SuppressLint
import android.util.Log
import co.tryterra.terrartandroid.websockets.BASE_URL
import kotlinx.coroutines.*
import org.json.JSONObject
import java.io.BufferedReader
import java.io.DataInputStream
import java.io.IOException
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL
import java.util.concurrent.Executors
import kotlin.coroutines.CoroutineContext

class GenerateUserToken (
    private val XApiKey: String,
    private val devId: String,
    private val userId: String,
): CoroutineScope {

    private val job = Job()
    private val singleThreadExecutor = Executors.newSingleThreadExecutor()
    override val coroutineContext: CoroutineContext
        get() = job + singleThreadExecutor.asCoroutineDispatcher()

    var token: String? = null

    @SuppressLint("HardwareIds")

    fun stop(){
        job.cancel()
        singleThreadExecutor.shutdown()
    }

    @Throws(IOException::class)
    fun generateToken(
        userId: String = this.userId,
        XApiKey: String = this.XApiKey,
        devId: String = this.devId,
    ) = launch {
            val serverURL = "$BASE_URL/auth/user?id=$userId"
            val url = URL(serverURL)
            val connection = url.openConnection() as HttpURLConnection
            connection.requestMethod = "POST"
            connection.doOutput = true
            connection.doInput = true

            connection.setRequestProperty("dev-id", devId)
            connection.setRequestProperty("X-API-Key", XApiKey)
            connection.setRequestProperty("Accept", "application/json")
            connection.setRequestProperty("Connection", "keep-alive")

            if (connection.responseCode == HttpURLConnection.HTTP_OK) {
                try {
                    val inputStream = DataInputStream(connection.inputStream)
                    val reader = BufferedReader(InputStreamReader(inputStream))
                    val output: String = reader.readLine()
                    val outputJson = JSONObject(output)
                    token = outputJson["token"].toString()
                    connection.disconnect()
                } catch (exception: Exception) {
                    Log.e(TAG, "There was error reading connection msg")
                    throw Exception("$exception")
                }
            }

            if (connection.responseCode != HttpURLConnection.HTTP_OK) {
                try {
                    val inputStream = DataInputStream(connection.inputStream)
                    val reader = BufferedReader(InputStreamReader(inputStream))
                    val output: String = reader.readLine()

                    Log.i(TAG, output)
                    connection.disconnect()

                } catch (exception: Exception) {
                    Log.e(TAG, "There was error with the request")
                    throw Exception("Failed: $exception with error code: ${connection.responseCode}")
                }
            }
            connection.disconnect()
        }

    fun getAuthToken(callback: (String?) -> Unit){
        generateToken().invokeOnCompletion {
            callback(this.token)
        }
    }


    companion object {
        private const val TAG = "WebsocketTokenGenerator"
    }
}