package com.example.sankalp.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String handle;
    private String email;
    private String password;
    private String avatar;
    private String bio;
    private String location;
    private String website;
    private Date joinDate;
    private int following;
    private int followers;
    private List<String> posts;
    private List<String> organizations;
    private String rank;
    private int points;
    private List<String> badges;
    private int streak;
}