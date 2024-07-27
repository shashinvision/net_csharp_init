### Example Project Setup with DOTNET 8.03

```bash

mkdir DatingApp   
cd DatingApp  

# Create a new solution file in the current directory. This command initializes a new .NET solution file (.sln) that will contain one or more projects.
dotnet new sln  

# Create a new Web API project named API with controllers. This command generates a new Web API project with the specified name API and includes support for controllers.
dotnet new webapi -controllers -n API    

# List all projects in the solution. This command shows all the projects that are currently included in the solution file.
dotnet sln list 

# Add the API project to the solution. This command includes the API project into the solution file, allowing it to be managed and built as part of the solution.
dotnet sln add API 

# Build and run the API project. This command compiles and executes the API project, starting the Web API application.
dotnet run

# Run the project and watch for file changes. This command runs the project and automatically restarts it if any source files are modified, which is useful for development and debugging.

dotnet watch
```
### Commands

- Create a new .NET project.
```
otnet new
```


### Commands

- Create a new .NET project.
```
dotnet new
```

- List new command options. The Short Name column has templates to use. Example:
```
dotnet new webapi -controllers -n API
```

- Restore dependencies specified in the project.
```
dotnet restore
```

- Build a project and all of its dependencies.
```
dotnet build
```

- Build and run a project.
```
dotnet run
```

- Run unit tests using a test runner specified in the project.
```
dotnet test
```

- Entity Framework Core command-line tools.
```
dotnet ef
```

- .NET Core global tools command-line.
```
dotnet tool
```

- Clean the output of a project.
```
dotnet clean
```

- Create a NuGet package.
```
dotnet pack
```

- Publish a .NET project.
```
dotnet publish
```

- Migrate a project from project.json to csproj.
```
dotnet migrate
```

- Modify solution (SLN) files.
```
dotnet sln
```

- NuGet command-line.
```
dotnet nuget
```


- List all available project templates.
```
dotnet new --list
```

- Display help information for a command.
```
dotnet help
```

- Display information about the installed .NET Core SDK.
```
dotnet --info
```

- Create/Recreate certs.
```
dotnet dev-certs https
```

- Trust certs.
```
dotnet dev-certs https --trust
```

- Clean certs.
```
dotnet dev-certs https --clean
```

- Entity Framework Core .NET Command-line Tools 8.0.3, with dotnet-ef tool.
```
dotnet tool list -g
```

- Install dotnet-ef. Ensure it is the same version as your dotnet.
```
dotnet tool install --global dotnet-ef --version 8.0.3
```
- Use [NuGet](https://www.nuget.org/).

- To view a help page of migrations.
```
dotnet ef migrations -h
```

- To use.
```
dotnet ef
```

- To create a Migration, remember to use `cd API` before.
```
dotnet ef migrations add InitialCreate -o Data/Migrations
```

- To see the help options on databases.
```
dotnet ef database -h
```

- To activate migrations.
```
dotnet ef database update
```

- To uninstall dotnet-ef.
```
dotnet tool uninstall --global dotnet-ef
```

- To create a .gitignore template file.
```
dotnet new gitignore
```

### Help Examples
- General help.
```
dotnet -h
```

- Help for webapi.
```
dotnet new webapi -h
```

- Help for subcommand webapi. Example usage: `dotnet new webapi -controllers -n API`
```
dotnet new webapi -controllers -h
```
