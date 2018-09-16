pragma solidity ^0.4.17;

contract SecurEd {
    address private owner;
    uint private id = 0;
    
    constructor() public {
        owner = msg.sender;
    }
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    struct CourseCertificate {
        uint courseId;
        uint gradeObtained;
    }
    
    mapping(address => uint[]) studentsToCertIds;
    mapping(address => uint[]) studentsEnrolledCourses;
    mapping(uint => CourseCertificate) IdsToCertificates;
    
    event studentEnrolled(address _student, uint _courseId);
    event certificateIssued(address _student, uint _courseId, uint _grade);

    function enrollInCourse(uint courseId) public payable {
        studentsEnrolledCourses[msg.sender].push(courseId);
        emit studentEnrolled(msg.sender, courseId);
    }

    function getEnrolledCourses() public view returns(uint[]) {
        return studentsEnrolledCourses[msg.sender];
    }

    function issueCertificate(address to, uint courseId, uint grade) public onlyOwner {
        CourseCertificate memory cert = CourseCertificate(courseId, grade);
        studentsToCertIds[to].push(id);
        IdsToCertificates[id] = cert;
        emit certificateIssued(to, courseId, grade);
        id++;
    }
    
    function getCertificateIds() public view returns(uint[]) {
        return studentsToCertIds[msg.sender];
    }
    
    function getCertificate(uint _id) public view returns (uint courseId, uint gradeObtained) {
        CourseCertificate memory cert = IdsToCertificates[_id];
        return (cert.courseId, cert.gradeObtained);
    }
}