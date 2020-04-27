package com.example;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class ModelRunner {

    public String[] bookIds;

    public Long[] movieIds;

    public void runCommand(String bookDbId, String movieDbId) {
        try{
            Process p = Runtime.getRuntime().exec("python3 " + getScriptPath() +  " " + bookDbId + " " + movieDbId);
            BufferedReader stdInput = new BufferedReader(new InputStreamReader(p.getInputStream()));
            String bookLine = stdInput.readLine();
            bookIds = bookLine.split(",");
            String movieLine = stdInput.readLine();
            String[] movieIdsStr = movieLine.split(",");
            movieIds = new Long[movieIdsStr.length];
            for(int i=0;i<movieIds.length;i++)  movieIds[i] = Long.parseLong(movieIdsStr[i]);
        } catch(IOException e){
            System.out.println(e.toString());
        }
    }

    public String getScriptPath(){
        String currentDir = System.getProperty("user.dir");
        int index = currentDir.lastIndexOf('/');
        String parentDir = currentDir.substring(0, index);
        index = parentDir.lastIndexOf('/');
        String grandParentDir = parentDir.substring(0, index);
        String path = grandParentDir + "/pred.py";
        return path;
    }
}
