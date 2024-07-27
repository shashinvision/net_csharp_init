### Example Project Setup

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

**dotnet new**
- Create a new .NET project.

**dotnet new list**
- lis a new command options, the Short Name column have a templates to use, example: dotnet new webapi -controllers -n API 
**dotnet restore**
- Restore dependencies specified in the project.

**dotnet build**
- Build a project and all of its dependencies.

**dotnet run**
- Build and run a project.

**dotnet test**
- Run unit tests using a test runner specified in project.

**dotnet ef**
- Entity Framework Core command-line tools.

**dotnet tool**
- .NET Core global tools command-line.

**dotnet clean**
- Clean the output of a project.

**dotnet pack**
- Create a NuGet package.

**dotnet publish**
- Publish a .NET project.

**dotnet migrate**
- Migrate a project from project.json to csproj.

**dotnet sln**
- Modify solution (SLN) files.

**dotnet nuget**
- NuGet command-line.

**dotnet new --list**
- List all available project templates.

**dotnet help**
- Display help information for a command.

**dotnet --info**
- Display information about the installed .NET Core SDK.

**dotnet dev-certs https**
- Create/Recreate certs.

**dotnet dev-certs https --trust**
- Trust certs.

**dotnet dev-certs https --clean**
- Clean certs.


**dotnet tool list -g**
- Entity Framework Core .NET Command-line Tools 8.0.3, with dotnet-ef tool 

**ddotnet tool install --global dotnet-ef --version 8.0.3**
- Install dotnet-ef, in this case need to be the same version of your dotnet, https://www.nuget.org/packages/dotnet-ef/8.0.3
- use https://www.nuget.org/

**dotnet ef migrations -h**
- To view a hep page of migrations  
**dotnet ef**
- To use 

**dotnet ef migrations add InitialCreate -o Data/Migrations**
- To create a Migration, remember use, **cd API** before

**dotnet ef database -h**
- To se the help options on data bases

**dotnet ef database update**
- to activate migrations


**dotnet tool uninstall --global dotnet-ef**
- To uninstall it 

**dotnet new gitignore**
- To create a .gitignore template file


### Help Examples
**dotnet -h**

**dotnet new webapi -h**

**dotnet new webapi -controllers -h**
- Help of subcommand webapi, to use example: dotnet new webapi -controllers -n API 