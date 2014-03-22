package com.nich01as.g1024.game;

import com.google.ads.AdRequest;
import com.google.ads.AdSize;
import com.google.ads.AdView;
import com.nich01as.g1024.game.util.SystemUiHider;

import android.annotation.TargetApi;
import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;


/**
 * An example full-screen activity that shows and hides the system UI (i.e.
 * status bar and navigation/system bar) with user interaction.
 *
 * @see SystemUiHider
 */
public class Main extends Activity {

    private static final String TAG = "G1024";

    private WebView webView;
    private AdView adView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.main);

        webView = (WebView) findViewById(R.id.fullscreen_content);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDatabaseEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.setWebViewClient(new MyWebViewClient());
        webView.getSettings().setUserAgentString("2048-android");
        adView = new AdView(this, AdSize.BANNER, "a15323bd6a1058f");
        FrameLayout ads = (FrameLayout) findViewById(R.id.ads);
        ads.addView(adView);
    }

    @Override
    protected void onStart() {
        super.onStart();
        adView.loadAd(new AdRequest());
        Log.d(TAG, "height " + adView.getHeight());
    }

    @Override
    public void onDestroy() {
        if (adView != null) {
            adView.destroy();
        }
        super.onDestroy();
    }

    @Override
    protected void onPostCreate(Bundle savedInstanceState) {
        super.onPostCreate(savedInstanceState);
        webView.loadUrl("http://www.go2048.com");
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();;
        }
    }

    private class MyWebViewClient extends WebViewClient {

        public WebResourceResponse shouldInterceptRequest(WebView view, String url) {
            return null;
        }

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            Uri uri = Uri.parse(url);
            Log.d(TAG, "url is " + url);
            if (url.contains("bshare")) {
                return true;
            }
            if (uri.getPath().contains("/g1024/share")) {
                String scoreStr = uri.getQueryParameter("score");
                Bitmap bmp = Bitmap.createBitmap(webView.getWidth(), webView.getHeight(), Bitmap.Config.ARGB_8888);
                Canvas canvas = new Canvas(bmp);
                webView.draw(canvas);
                File cacheDir = getCacheDir();
                File file = new File(getExternalCacheDir(), "img.png");
                if (file.exists()) {
                    file.delete();
                }
                try {
                    file.createNewFile();
                    OutputStream outStream = new FileOutputStream(file);
                    bmp.compress(Bitmap.CompressFormat.PNG, 100, outStream);
                    outStream.flush();
                    outStream.close();
                }
                catch(Exception e){
                    e.printStackTrace();
                }
                Uri imageUri = Uri.fromFile(file);
                Intent shareIntent = new Intent();
                shareIntent.setAction(Intent.ACTION_SEND);
                shareIntent.putExtra(Intent.EXTRA_TEXT, "我刚刚完成了 #Go2048#！" +
                        "https://s3-ap-northeast-1.amazonaws.com/go2048/game.apk");
                shareIntent.putExtra(Intent.EXTRA_STREAM, imageUri);
                shareIntent.setType("image/*");
                shareIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                startActivity(Intent.createChooser(shareIntent, "send"));
                return true;
            }
            return false;
        }

    }

}
