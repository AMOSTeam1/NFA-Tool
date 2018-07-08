package com.msg.nfabackend.resources;

import java.io.InputStream;
import java.net.URI;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import com.msg.nfabackend.entities.Project;
import com.msg.nfabackend.services.QueryService;
import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;

/**
 * JAX-RS-Resource for Entity 'project'
 * 
 */
@Path("project")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ProjectResource {

	@Inject
	private QueryService queryService;

	@GET
	public List<Project> getAllProject() {
		return queryService.getAllProject();
	}

	@POST
	@Path("/create")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createProject(Project project, @Context UriInfo uriInfo) {

		Project createProject = queryService.createProject(project);
		String newId = String.valueOf(createProject.getId());
		URI uri = uriInfo.getAbsolutePathBuilder().path(newId).build();
		return Response.created(uri).entity(createProject).build();
	}

	@DELETE
	@Path("/{ProjectId}")
	public void deleteProject(@PathParam("ProjectId") Long Id) {
		queryService.removeProject(Id);
	}

	@POST
	@Path("/edit")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void editProject(Project project, @Context UriInfo uriInfo) {
		queryService.updateProject(project);
	}

	@GET
	@Path("/search")
	public List<Project> searchProject(@QueryParam(value = "status") String status,
			@QueryParam(value = "lookupCustName") String lookupCustName) {
		return queryService.findProject(status, lookupCustName);
	}

	@POST
	@Path("/importnfa")
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes({ MediaType.MULTIPART_FORM_DATA })
	public Response upload(@FormDataParam("file") InputStream uploadedInputStream,
			@FormDataParam("file") FormDataContentDisposition fileInputDetails) {

		System.out.println("CONSUMED: " + fileInputDetails.getFileName());

		return Response.status(200).entity("CONSUMED: " + fileInputDetails.getFileName()).build();
	}
}
