package com.msg.nfabackend.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.Column;


@Entity
@Table(name ="users")
public class User {
	public User() {}
	 
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column (name ="user_id")
	private Long user_id;
	
	@Column (name ="username")
	private String username;
	
	@Column (name="password")
	private String password;
	

	public Long getUserId() {
		return user_id;
	}

	public void setUserId(Long user_id) {
		this.user_id = user_id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	}