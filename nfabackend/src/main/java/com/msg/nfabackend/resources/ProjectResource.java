package com.msg.nfabackend.resources;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.msg.nfabackend.entities.Project;
import com.msg.nfabackend.services.QueryService;

@Path("/project")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ProjectResource {
	
	QueryService queryService = new QueryService();
	
	@GET
	public List<Project> getAllProject() {
		return queryService.getAllProject();
	}
	
	@POST
	@Path("/create")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String createProject(Project project) {
		queryService.createProject(project);
		return "BlaBla";
	}
} 
