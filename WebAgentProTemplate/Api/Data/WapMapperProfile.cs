using AutoMapper;
using WebAgentPro.ViewModels;
using WebAgentProTemplate.Api;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace WebAgentPro.Data
{
  public class WapMapperProfile : Profile
  {
    public WapMapperProfile()
    {
      CreateMap<UserRegistration, User>();
      CreateMap<Api.Models.User, ViewModels.User>();
    }
  }
}
