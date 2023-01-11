import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GenderDataType from 'Database/fileBasedData/GenderDataType'
import EmploymentStatusDataType from 'Database/fileBasedData/EmploymentStatusDataType'
import HighestEducationLevelDataType from 'Database/fileBasedData/HighestEducationLevelDataType'

export default class UpdateProfileValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    genderEnum: GenderDataType.map((gender) => gender.slug),
    employmentStatusDataType: EmploymentStatusDataType.map((status) => status.slug),
    highestEducationLevelDataType: HighestEducationLevelDataType.map((level) => level.slug),
  })

  public schema = schema.create({
    first_name: schema.string([rules.trim(), rules.minLength(3), rules.maxLength(200)]),
    last_name: schema.string([rules.trim(), rules.minLength(3), rules.maxLength(200)]),
    phone_number: schema.string([rules.trim(), rules.minLength(10), rules.maxLength(15)]),
    contact_address: schema.string([rules.trim(), rules.minLength(3), rules.maxLength(200)]),
    gender: schema.enum(this.refs.genderEnum),
    dob: schema.date({ format: 'yyyy-MM-dd' }),
    employment_status: schema.enum(this.refs.employmentStatusDataType),
    highest_education_level: schema.enum(this.refs.highestEducationLevelDataType),
    lga_identifier: schema.string([rules.trim(), rules.minLength(10)]),
    additional_information: schema.string([rules.trim(), rules.nullable()]),
  })
  public messages: CustomMessages = {
    'first_name.required': 'First Name is required',
    'first_name.minLength': 'First Name must be at least 3 characters',
    'first_name.maxLength': 'First Name must be than 200 characters',
    'last_name.required': 'Last Name is required',
    'last_name.minLength': 'Last Name must be at least 3 characters',
    'last_name.maxLength': 'Last Name must be less than 200 characters',
    'phone_number.required': 'Phone Number is required',
    'phone_number.minLength': 'Phone Number must be at least 10 characters',
    'phone_number.maxLength': 'Phone Number must be less 15 characters',
    'contact_address.required': 'Contact Address is required',
    'contact_address.minLength': 'Contact Address must be at least 3 characters',
    'contact_address.maxLength': 'Contact Address must be less 200 characters',
    'gender.required': 'Gender is required',
    'gender.enum': 'Gender is not valid',
    'employment_status.required': 'Employment Status is required',
    'employment_status.enum': 'Employment Status is not valid',
    'dob.required': 'Date of Birth is required',
    'highest_education_level.required': 'Highest Education Level is required',
    'highest_education_level.enum': 'Highest Education Level is not valid',
    'lga_identifier.required': 'Lga is required',
    'lga_identifier.minLength': 'Lga is not valid',
    'additional_information.required': 'Additional Information is required',
    'additional_information.nullable': 'Additional Information should be set null if not required',
  }
}
