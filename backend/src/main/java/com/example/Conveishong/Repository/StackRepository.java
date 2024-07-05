<<<<<<< Updated upstream
package com.example.Conveishong.Repository;public interface StackRepository {
=======
package com.example.Conveishong.Repository;

import com.example.Conveishong.Model.Stack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StackRepository extends JpaRepository<Stack, Long> {
    public List<Stack> findByStackDay(String stackDay);
    public List<Stack> findByStackName(String stackName);
    public List<Stack> findByStackDayAndMarketId(String stackDay, Long marketId);
    public List<Stack> findByStackDayAndMarketIdAndStackType(String stackDay, Long marketId, String stackType);
>>>>>>> Stashed changes
}
