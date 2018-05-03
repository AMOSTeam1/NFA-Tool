package com.msg.nfabackend.resources;

import java.net.URI;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import com.msg.nfabackend.entities.Project;
import com.msg.nfabackend.services.QueryService;

/**
 * JAX-RS-Resource for Entity 'project'
 * 
 * @author <a href="mailto:alla.bors@fau.de">Alla Bors</a>
 */
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
	@Produces(MediaType.APPLICATION_JSON)
	public Response createProject(Project project,  @Context UriInfo uriInfo) {
		
		Project createProject = queryService.createProject(project);
		String newId = String.valueOf(createProject.getId());
        URI uri = uriInfo.getAbsolutePathBuilder().path(newId).build();
        return Response.created(uri)
                .entity(createProject)
                .build();
	}
	
	@DELETE
	@Path("/{ProjectId}")
	public void deleteProject(@PathParam("ProjectId") Long Id) {
		 queryService.removeProject(Id);
	}
} 
