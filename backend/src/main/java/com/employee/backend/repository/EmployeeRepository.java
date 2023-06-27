package com.employee.backend.repository;

import com.employee.backend.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    //Native Queries
    @Query(value = "SELECT * FROM employee WHERE " + "(:name IS NULL OR name = :name) AND "
            + "(:address IS NULL OR address = :address) AND " + "(:phone IS NULL OR phone = :phone) AND "
            + "(:nic IS NULL OR nic = :nic) AND " + "(:nationality IS NULL OR nationality = :nationality) AND "
            + "(:birthday IS NULL OR birthday = :birthday) AND " + "(:age IS NULL OR age = :age) AND "
            + "(:gender IS NULL OR gender = :gender)", nativeQuery = true)
    List<Employee> searchUsers(@Param("name") String userName, @Param("address") String userAddress,
                           @Param("phone") String userMobile, @Param("nic") String userNic,
                           @Param("nationality") String userNationality, @Param("birthday") String userBirthday,
                           @Param("age") Integer userAge, @Param("gender") String userGender);

}